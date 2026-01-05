theRoot = {
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


// xxxxxxxxxxxxxxxxxxx Base 64 Encode Libreary xxxxxxxxxxxx
function StringBuffer(){this.buffer=[]}StringBuffer.prototype.append=function(a){this.buffer.push(a);return this};StringBuffer.prototype.toString=function(){return this.buffer.join("")};
var Base64={codex:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){for(var c=new StringBuffer,a=new Utf8EncodeEnumerator(a);a.moveNext();){var b=a.current;a.moveNext();var d=a.current;a.moveNext();var e=a.current,h=b>>2,b=(b&3)<<4|d>>4,g=(d&15)<<2|e>>6,f=e&63;isNaN(d)?g=f=64:isNaN(e)&&(f=64);c.append(this.codex.charAt(h)+this.codex.charAt(b)+this.codex.charAt(g)+this.codex.charAt(f))}return c.toString()},decode:function(a){for(var c=new StringBuffer,a=new Base64DecodeEnumerator(a);a.moveNext();){var b=
a.current;if(128>b)c.append(String.fromCharCode(b));else if(191<b&&224>b){a.moveNext();var d=a.current;c.append(String.fromCharCode((b&31)<<6|d&63))}else a.moveNext(),d=a.current,a.moveNext(),c.append(String.fromCharCode((b&15)<<12|(d&63)<<6|a.current&63))}return c.toString()}};function Utf8EncodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Utf8EncodeEnumerator.prototype={current:Number.NaN,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=Number.NaN,!1;var a=this._input.charCodeAt(++this._index);13==a&&10==this._input.charCodeAt(this._index+1)&&(a=10,this._index+=2);128>a?this.current=a:(127<a&&2048>a?this.current=a>>6|192:(this.current=a>>12|224,this._buffer.push(a>>6&63|128)),this._buffer.push(a&63|128));return!0}};
function Base64DecodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Base64DecodeEnumerator.prototype={current:64,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=64,!1;var a=Base64.codex.indexOf(this._input.charAt(++this._index)),c=Base64.codex.indexOf(this._input.charAt(++this._index)),b=Base64.codex.indexOf(this._input.charAt(++this._index)),d=Base64.codex.indexOf(this._input.charAt(++this._index)),e=(b&3)<<6|d;this.current=a<<2|c>>4;64!=b&&this._buffer.push((c&15)<<
4|b>>2);64!=d&&this._buffer.push(e);return!0}};


(function(k,b){Handlebars=b()})(this,function(){return function(k){function b(m){if(e[m])return e[m].exports;var p=e[m]={exports:{},id:m,loaded:!1};k[m].call(p.exports,p,p.exports,b);p.loaded=!0;return p.exports}var e={};b.m=k;b.c=e;b.p="";return b(0)}([function(k,b,e){function m(){var h=c();h.compile=function(c,a){return d.compile(c,a,h)};h.precompile=function(c,a){return d.precompile(c,a,h)};h.AST=f["default"];h.Compiler=d.Compiler;h.JavaScriptCompiler=g["default"];h.Parser=n.parser;h.parse=n.parse;
return h}var p=e(8)["default"];b.__esModule=!0;var l=e(1),l=p(l),a=e(2),f=p(a),n=e(3),d=e(4),a=e(5),g=p(a),a=e(6),a=p(a);e=e(7);var p=p(e),c=l["default"].create,l=m();l.create=m;p["default"](l);l.Visitor=a["default"];l["default"]=l;b["default"]=l;k.exports=b["default"]},function(k,b,e){function m(){var h=new f.HandlebarsEnvironment;g.extend(h,f);h.SafeString=n["default"];h.Exception=d["default"];h.Utils=g;h.escapeExpression=g.escapeExpression;h.VM=c;h.template=function(a){return c.template(a,h)};
return h}var p=e(9)["default"],l=e(8)["default"];b.__esModule=!0;var a=e(10),f=p(a),a=e(11),n=l(a),a=e(12),d=l(a),a=e(13),g=p(a),a=e(14),c=p(a);e=e(7);l=l(e);e=m();e.create=m;l["default"](e);e["default"]=e;b["default"]=e;k.exports=b["default"]},function(k,b,e){b.__esModule=!0;var m={helpers:{helperExpression:function(b){return"SubExpression"===b.type||("MustacheStatement"===b.type||"BlockStatement"===b.type)&&!!(b.params&&b.params.length||b.hash)},scopedId:function(b){return/^\.|this\b/.test(b.original)},
simpleId:function(b){return 1===b.parts.length&&!m.helpers.scopedId(b)&&!b.depth}}};b["default"]=m;k.exports=b["default"]},function(k,b,e){var m=e(8)["default"];k=e(9)["default"];b.__esModule=!0;b.parse=function(b,d){if("Program"===b.type)return b;l["default"].yy=f;f.locInfo=function(a){return new f.SourceLocation(d&&d.srcName,a)};return(new a["default"](d)).accept(l["default"].parse(b))};var p=e(15),l=m(p),p=e(16),a=m(p),m=e(17);k=k(m);e=e(13);b.parser=l["default"];var f={};e.extend(f,k)},function(k,
b,e){function m(){}function p(a,c){if(a===c)return!0;if(f.isArray(a)&&f.isArray(c)&&a.length===c.length){for(var h=0;h<a.length;h++)if(!p(a[h],c[h]))return!1;return!0}}function l(a){if(!a.path.parts){var c=a.path;a.path={type:"PathExpression",data:!1,depth:0,parts:[c.original+""],original:c.original+"",loc:c.loc}}}k=e(8)["default"];b.__esModule=!0;b.Compiler=m;b.precompile=function(g,c,h){if(null==g||"string"!==typeof g&&"Program"!==g.type)throw new a["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+
g);c=c||{};"data"in c||(c.data=!0);c.compat&&(c.useDepths=!0);g=h.parse(g,c);g=(new h.Compiler).compile(g,c);return(new h.JavaScriptCompiler).compile(g,c)};b.compile=function(g,c,h){function d(){var a=h.parse(g,c),a=(new h.Compiler).compile(a,c),a=(new h.JavaScriptCompiler).compile(a,c,void 0,!0);return h.template(a)}function f(h,c){b||(b=d());return b.call(this,h,c)}void 0===c&&(c={});if(null==g||"string"!==typeof g&&"Program"!==g.type)throw new a["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+
g);"data"in c||(c.data=!0);c.compat&&(c.useDepths=!0);var b=void 0;f._setup=function(h){b||(b=d());return b._setup(h)};f._child=function(h,c,a,g){b||(b=d());return b._child(h,c,a,g)};return f};b=e(12);var a=k(b),f=e(13);e=e(2);var n=k(e),d=[].slice;m.prototype={compiler:m,equals:function(a){var c=this.opcodes.length;if(a.opcodes.length!==c)return!1;for(var h=0;h<c;h++){var d=this.opcodes[h],f=a.opcodes[h];if(d.opcode!==f.opcode||!p(d.args,f.args))return!1}c=this.children.length;for(h=0;h<c;h++)if(!this.children[h].equals(a.children[h]))return!1;
return!0},guid:0,compile:function(a,c){this.sourceNode=[];this.opcodes=[];this.children=[];this.options=c;this.stringParams=c.stringParams;this.trackIds=c.trackIds;c.blockParams=c.blockParams||[];var h=c.knownHelpers;c.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0,lookup:!0};if(h)for(var d in h)d in h&&(c.knownHelpers[d]=h[d]);return this.accept(a)},compileProgram:function(a){a=(new this.compiler).compile(a,this.options);var c=this.guid++;this.usePartial=
this.usePartial||a.usePartial;this.children[c]=a;this.useDepths=this.useDepths||a.useDepths;return c},accept:function(g){if(!this[g.type])throw new a["default"]("Unknown type: "+g.type,g);this.sourceNode.unshift(g);g=this[g.type](g);this.sourceNode.shift();return g},Program:function(a){this.options.blockParams.unshift(a.blockParams);for(var c=a.body,h=c.length,d=0;d<h;d++)this.accept(c[d]);this.options.blockParams.shift();this.isSimple=1===h;this.blockParams=a.blockParams?a.blockParams.length:0;return this},
BlockStatement:function(a){l(a);var c=a.program,h=a.inverse,c=c&&this.compileProgram(c),h=h&&this.compileProgram(h),d=this.classifySexpr(a);"helper"===d?this.helperSexpr(a,c,h):"simple"===d?(this.simpleSexpr(a),this.opcode("pushProgram",c),this.opcode("pushProgram",h),this.opcode("emptyHash"),this.opcode("blockValue",a.path.original)):(this.ambiguousSexpr(a,c,h),this.opcode("pushProgram",c),this.opcode("pushProgram",h),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue"));this.opcode("append")},
DecoratorBlock:function(a){var c=a.program&&this.compileProgram(a.program),c=this.setupFullMustacheParams(a,c,void 0);a=a.path;this.useDecorators=!0;this.opcode("registerDecorator",c.length,a.original)},PartialStatement:function(g){this.usePartial=!0;var c=g.program;c&&(c=this.compileProgram(g.program));var h=g.params;if(1<h.length)throw new a["default"]("Unsupported number of partial arguments: "+h.length,g);h.length||(this.options.explicitPartialContext?this.opcode("pushLiteral","undefined"):h.push({type:"PathExpression",
parts:[],depth:0}));var h=g.name.original,d="SubExpression"===g.name.type;d&&this.accept(g.name);this.setupFullMustacheParams(g,c,void 0,!0);g=g.indent||"";this.options.preventIndent&&g&&(this.opcode("appendContent",g),g="");this.opcode("invokePartial",d,h,g);this.opcode("append")},PartialBlockStatement:function(a){this.PartialStatement(a)},MustacheStatement:function(a){this.SubExpression(a);a.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},Decorator:function(a){this.DecoratorBlock(a)},
ContentStatement:function(a){a.value&&this.opcode("appendContent",a.value)},CommentStatement:function(){},SubExpression:function(a){l(a);var c=this.classifySexpr(a);"simple"===c?this.simpleSexpr(a):"helper"===c?this.helperSexpr(a):this.ambiguousSexpr(a)},ambiguousSexpr:function(a,c,h){a=a.path;var d=a.parts[0],f=null!=c||null!=h;this.opcode("getContext",a.depth);this.opcode("pushProgram",c);this.opcode("pushProgram",h);a.strict=!0;this.accept(a);this.opcode("invokeAmbiguous",d,f)},simpleSexpr:function(a){a=
a.path;a.strict=!0;this.accept(a);this.opcode("resolvePossibleLambda")},helperSexpr:function(d,c,h){c=this.setupFullMustacheParams(d,c,h);h=d.path;var f=h.parts[0];if(this.options.knownHelpers[f])this.opcode("invokeKnownHelper",c.length,f);else{if(this.options.knownHelpersOnly)throw new a["default"]("You specified knownHelpersOnly, but used the unknown helper "+f,d);h.strict=!0;h.falsy=!0;this.accept(h);this.opcode("invokeHelper",c.length,h.original,n["default"].helpers.simpleId(h))}},PathExpression:function(a){this.addDepth(a.depth);
this.opcode("getContext",a.depth);var c=a.parts[0],h=n["default"].helpers.scopedId(a),d=!a.depth&&!h&&this.blockParamIndex(c);d?this.opcode("lookupBlockParam",d,a.parts):c?a.data?(this.options.data=!0,this.opcode("lookupData",a.depth,a.parts,a.strict)):this.opcode("lookupOnContext",a.parts,a.falsy,a.strict,h):this.opcode("pushContext")},StringLiteral:function(a){this.opcode("pushString",a.value)},NumberLiteral:function(a){this.opcode("pushLiteral",a.value)},BooleanLiteral:function(a){this.opcode("pushLiteral",
a.value)},UndefinedLiteral:function(){this.opcode("pushLiteral","undefined")},NullLiteral:function(){this.opcode("pushLiteral","null")},Hash:function(a){a=a.pairs;var c=0,h=a.length;for(this.opcode("pushHash");c<h;c++)this.pushParam(a[c].value);for(;c--;)this.opcode("assignToHash",a[c].key);this.opcode("popHash")},opcode:function(a){this.opcodes.push({opcode:a,args:d.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function(a){a&&(this.useDepths=!0)},classifySexpr:function(a){var c=n["default"].helpers.simpleId(a.path),
h=c&&!!this.blockParamIndex(a.path.parts[0]),d=!h&&n["default"].helpers.helperExpression(a);(c=!h&&(d||c))&&!d&&(h=this.options,h.knownHelpers[a.path.parts[0]]?d=!0:h.knownHelpersOnly&&(c=!1));return d?"helper":c?"ambiguous":"simple"},pushParams:function(a){for(var c=0,h=a.length;c<h;c++)this.pushParam(a[c])},pushParam:function(a){var c=null!=a.value?a.value:a.original||"";if(this.stringParams)c.replace&&(c=c.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")),a.depth&&this.addDepth(a.depth),this.opcode("getContext",
a.depth||0),this.opcode("pushStringParam",c,a.type),"SubExpression"===a.type&&this.accept(a);else{if(this.trackIds){var h=void 0;!a.parts||n["default"].helpers.scopedId(a)||a.depth||(h=this.blockParamIndex(a.parts[0]));h?(c=a.parts.slice(1).join("."),this.opcode("pushId","BlockParam",h,c)):(c=a.original||c,c.replace&&(c=c.replace(/^this(?:\.|$)/,"").replace(/^\.\//,"").replace(/^\.$/,"")),this.opcode("pushId",a.type,c))}this.accept(a)}},setupFullMustacheParams:function(a,c,h,d){var f=a.params;this.pushParams(f);
this.opcode("pushProgram",c);this.opcode("pushProgram",h);a.hash?this.accept(a.hash):this.opcode("emptyHash",d);return f},blockParamIndex:function(a){for(var c=0,h=this.options.blockParams.length;c<h;c++){var d=this.options.blockParams[c],b=d&&f.indexOf(d,a);if(d&&0<=b)return[c,b]}}}},function(k,b,e){function m(a){this.value=a}function p(){}function l(a,c,d,f){var g=c.popStack(),b=0,l=d.length;for(a&&l--;b<l;b++)g=c.nameLookup(g,d[b],f);return a?[c.aliasable("container.strict"),"(",g,", ",c.quotedString(d[b]),
")"]:g}var a=e(8)["default"];b.__esModule=!0;var f=e(10),n=e(12),d=a(n),g=e(13);e=e(18);var c=a(e);p.prototype={nameLookup:function(a,c){return p.isValidJavaScriptVariableName(c)?[a,".",c]:[a,"[",JSON.stringify(c),"]"]},depthedLookup:function(a){return[this.aliasable("container.lookup"),'(depths, "',a,'")']},compilerInfo:function(){var a=f.COMPILER_REVISION;return[a,f.REVISION_CHANGES[a]]},appendToBuffer:function(a,c,d){g.isArray(a)||(a=[a]);a=this.source.wrap(a,c);if(this.environment.isSimple)return["return ",
a,";"];if(d)return["buffer += ",a,";"];a.appendToBuffer=!0;return a},initializeBuffer:function(){return this.quotedString("")},compile:function(a,c,f,g){this.environment=a;this.options=c;this.stringParams=this.options.stringParams;this.trackIds=this.options.trackIds;this.precompile=!g;this.name=this.environment.name;this.isChild=!!f;this.context=f||{decorators:[],programs:[],environments:[]};this.preamble();this.stackSlot=0;this.stackVars=[];this.aliases={};this.registers={list:[]};this.hashes=[];
this.compileStack=[];this.inlineStack=[];this.blockParams=[];this.compileChildren(a,c);this.useDepths=this.useDepths||a.useDepths||a.useDecorators||this.options.compat;this.useBlockParams=this.useBlockParams||a.useBlockParams;var b=a.opcodes,l=void 0,n=void 0;f=a=void 0;a=0;for(f=b.length;a<f;a++)l=b[a],this.source.currentLocation=l.loc,n=n||l.loc,this[l.opcode].apply(this,l.args);this.source.currentLocation=n;this.pushSource("");if(this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new d["default"]("Compile completed with content left on stack");
this.decorators.isEmpty()?this.decorators=void 0:(this.useDecorators=!0,this.decorators.prepend("var decorators = container.decorators;\n"),this.decorators.push("return fn;"),g?this.decorators=Function.apply(this,["fn","props","container","depth0","data","blockParams","depths",this.decorators.merge()]):(this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"),this.decorators.push("}\n"),this.decorators=this.decorators.merge()));a=this.createFunctionContext(g);
if(this.isChild)return a;b={compiler:this.compilerInfo(),main:a};this.decorators&&(b.main_d=this.decorators,b.useDecorators=!0);a=this.context;l=a.programs;n=a.decorators;a=0;for(f=l.length;a<f;a++)l[a]&&(b[a]=l[a],n[a]&&(b[a+"_d"]=n[a],b.useDecorators=!0));this.environment.usePartial&&(b.usePartial=!0);this.options.data&&(b.useData=!0);this.useDepths&&(b.useDepths=!0);this.useBlockParams&&(b.useBlockParams=!0);this.options.compat&&(b.compat=!0);g?b.compilerOptions=this.options:(b.compiler=JSON.stringify(b.compiler),
this.source.currentLocation={start:{line:1,column:0}},b=this.objectLiteral(b),c.srcName?(b=b.toStringWithSourceMap({file:c.destName}),b.map=b.map&&b.map.toString()):b=b.toString());return b},preamble:function(){this.lastContext=0;this.source=new c["default"](this.options.srcName);this.decorators=new c["default"](this.options.srcName)},createFunctionContext:function(a){var c="",d=this.stackVars.concat(this.registers.list);0<d.length&&(c+=", "+d.join(", "));var d=0,b;for(b in this.aliases){var f=this.aliases[b];
this.aliases.hasOwnProperty(b)&&f.children&&1<f.referenceCount&&(c+=", alias"+ ++d+"="+b,f.children[0]="alias"+d)}b=["container","depth0","helpers","partials","data"];(this.useBlockParams||this.useDepths)&&b.push("blockParams");this.useDepths&&b.push("depths");c=this.mergeSource(c);return a?(b.push(c),Function.apply(this,b)):this.source.wrap(["function(",b.join(","),") {\n  ",c,"}"])},mergeSource:function(a){var c=this.environment.isSimple,d=!this.forceBuffer,b=void 0,f=void 0,g=void 0,l=void 0;this.source.each(function(a){a.appendToBuffer?
(g?a.prepend("  + "):g=a,l=a):(g&&(f?g.prepend("buffer += "):b=!0,l.add(";"),g=l=void 0),f=!0,c||(d=!1))});d?g?(g.prepend("return "),l.add(";")):f||this.source.push('return "";'):(a+=", buffer = "+(b?"":this.initializeBuffer()),g?(g.prepend("return buffer + "),l.add(";")):this.source.push("return buffer;"));a&&this.source.prepend("var "+a.substring(2)+(b?"":";\n"));return this.source.merge()},blockValue:function(a){var c=this.aliasable("helpers.blockHelperMissing"),d=[this.contextName(0)];this.setupHelperArgs(a,
0,d);a=this.popStack();d.splice(1,0,a);this.push(this.source.functionCall(c,"call",d))},ambiguousBlockValue:function(){var a=this.aliasable("helpers.blockHelperMissing"),c=[this.contextName(0)];this.setupHelperArgs("",0,c,!0);this.flushInline();var d=this.topStack();c.splice(1,0,d);this.pushSource(["if (!",this.lastHelper,") { ",d," = ",this.source.functionCall(a,"call",c),"}"])},appendContent:function(a){this.pendingContent?a=this.pendingContent+a:this.pendingLocation=this.source.currentLocation;
this.pendingContent=a},append:function(){if(this.isInline())this.replaceStack(function(a){return[" != null ? ",a,' : ""']}),this.pushSource(this.appendToBuffer(this.popStack()));else{var a=this.popStack();this.pushSource(["if (",a," != null) { ",this.appendToBuffer(a,void 0,!0)," }"]);this.environment.isSimple&&this.pushSource(["else { ",this.appendToBuffer("''",void 0,!0)," }"])}},appendEscaped:function(){this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"),"(",this.popStack(),
")"]))},getContext:function(a){this.lastContext=a},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(a,c,d,b){var f=0;b||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(a[f++]));this.resolvePath("context",a,f,c,d)},lookupBlockParam:function(a,c){this.useBlockParams=!0;this.push(["blockParams[",a[0],"][",a[1],"]"]);this.resolvePath("context",c,1)},lookupData:function(a,c,d){a?this.pushStackLiteral("container.data(data, "+
a+")"):this.pushStackLiteral("data");this.resolvePath("data",c,0,!0,d)},resolvePath:function(a,c,d,b,f){var g=this;if(this.options.strict||this.options.assumeObjects)this.push(l(this.options.strict&&f,this,c,a));else for(f=c.length;d<f;d++)this.replaceStack(function(f){var l=g.nameLookup(f,c[d],a);return b?[" && ",l]:[" != null ? ",l," : ",f]})},resolvePossibleLambda:function(){this.push([this.aliasable("container.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function(a,
c){this.pushContext();this.pushString(c);"SubExpression"!==c&&("string"===typeof a?this.pushString(a):this.pushStackLiteral(a))},emptyHash:function(a){this.trackIds&&this.push("{}");this.stringParams&&(this.push("{}"),this.push("{}"));this.pushStackLiteral(a?"undefined":"{}")},pushHash:function(){this.hash&&this.hashes.push(this.hash);this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var a=this.hash;this.hash=this.hashes.pop();this.trackIds&&this.push(this.objectLiteral(a.ids));
this.stringParams&&(this.push(this.objectLiteral(a.contexts)),this.push(this.objectLiteral(a.types)));this.push(this.objectLiteral(a.values))},pushString:function(a){this.pushStackLiteral(this.quotedString(a))},pushLiteral:function(a){this.pushStackLiteral(a)},pushProgram:function(a){null!=a?this.pushStackLiteral(this.programExpression(a)):this.pushStackLiteral(null)},registerDecorator:function(a,c){var d=this.nameLookup("decorators",c,"decorator"),b=this.setupHelperArgs(c,a);this.decorators.push(["fn = ",
this.decorators.functionCall(d,"",["fn","props","container",b])," || fn;"])},invokeHelper:function(a,c,d){var b=this.popStack();a=this.setupHelper(a,c);d=["("].concat(d?[a.name," || "]:"",b);this.options.strict||d.push(" || ",this.aliasable("helpers.helperMissing"));d.push(")");this.push(this.source.functionCall(d,"call",a.callParams))},invokeKnownHelper:function(a,c){var d=this.setupHelper(a,c);this.push(this.source.functionCall(d.name,"call",d.callParams))},invokeAmbiguous:function(a,c){this.useRegister("helper");
var d=this.popStack();this.emptyHash();var b=this.setupHelper(0,a,c),d=["(","(helper = ",this.lastHelper=this.nameLookup("helpers",a,"helper")," || ",d,")"];this.options.strict||(d[0]="(helper = ",d.push(" != null ? helper : ",this.aliasable("helpers.helperMissing")));this.push(["(",d,b.paramsInit?["),(",b.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",b.callParams)," : helper))"])},invokePartial:function(a,c,d){var b=[],f=this.setupParams(c,
1,b);a&&(c=this.popStack(),delete f.name);d&&(f.indent=JSON.stringify(d));f.helpers="helpers";f.partials="partials";f.decorators="container.decorators";a?b.unshift(c):b.unshift(this.nameLookup("partials",c,"partial"));this.options.compat&&(f.depths="depths");f=this.objectLiteral(f);b.push(f);this.push(this.source.functionCall("container.invokePartial","",b))},assignToHash:function(a){var c=this.popStack(),d=void 0,b=void 0,f=void 0;this.trackIds&&(f=this.popStack());this.stringParams&&(b=this.popStack(),
d=this.popStack());var g=this.hash;d&&(g.contexts[a]=d);b&&(g.types[a]=b);f&&(g.ids[a]=f);g.values[a]=c},pushId:function(a,c,d){"BlockParam"===a?this.pushStackLiteral("blockParams["+c[0]+"].path["+c[1]+"]"+(d?" + "+JSON.stringify("."+d):"")):"PathExpression"===a?this.pushString(c):"SubExpression"===a?this.pushStackLiteral("true"):this.pushStackLiteral("null")},compiler:p,compileChildren:function(a,c){for(var d=a.children,b=void 0,f=void 0,g=0,l=d.length;g<l;g++){var b=d[g],f=new this.compiler,n=this.matchExistingProgram(b);
null==n?(this.context.programs.push(""),n=this.context.programs.length,b.index=n,b.name="program"+n,this.context.programs[n]=f.compile(b,c,this.context,!this.precompile),this.context.decorators[n]=f.decorators,this.context.environments[n]=b,this.useDepths=this.useDepths||f.useDepths,this.useBlockParams=this.useBlockParams||f.useBlockParams):(b.index=n,b.name="program"+n,this.useDepths=this.useDepths||b.useDepths,this.useBlockParams=this.useBlockParams||b.useBlockParams)}},matchExistingProgram:function(a){for(var c=
0,d=this.context.environments.length;c<d;c++){var b=this.context.environments[c];if(b&&b.equals(a))return c}},programExpression:function(a){a=this.environment.children[a];a=[a.index,"data",a.blockParams];(this.useBlockParams||this.useDepths)&&a.push("blockParams");this.useDepths&&a.push("depths");return"container.program("+a.join(", ")+")"},useRegister:function(a){this.registers[a]||(this.registers[a]=!0,this.registers.list.push(a))},push:function(a){a instanceof m||(a=this.source.wrap(a));this.inlineStack.push(a);
return a},pushStackLiteral:function(a){this.push(new m(a))},pushSource:function(a){this.pendingContent&&(this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation)),this.pendingContent=void 0);a&&this.source.push(a)},replaceStack:function(a){var c=["("],b=void 0,f=void 0,g=void 0;if(!this.isInline())throw new d["default"]("replaceStack on non-inline");c=this.popStack(!0);c instanceof m?(b=[c.value],c=["(",b],g=!0):(f=!0,b=this.incrStack(),c=["((",this.push(b),
" = ",c,")"],b=this.topStack());a=a.call(this,b);g||this.popStack();f&&this.stackSlot--;this.push(c.concat(a,")"))},incrStack:function(){this.stackSlot++;this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot);return this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var a=this.inlineStack;this.inlineStack=[];for(var c=0,d=a.length;c<d;c++){var b=a[c];if(b instanceof m)this.compileStack.push(b);else{var f=this.incrStack();this.pushSource([f,
" = ",b,";"]);this.compileStack.push(f)}}},isInline:function(){return this.inlineStack.length},popStack:function(a){var c=this.isInline(),b=(c?this.inlineStack:this.compileStack).pop();if(!a&&b instanceof m)return b.value;if(!c){if(!this.stackSlot)throw new d["default"]("Invalid stack pop");this.stackSlot--}return b},topStack:function(){var a=this.isInline()?this.inlineStack:this.compileStack,a=a[a.length-1];return a instanceof m?a.value:a},contextName:function(a){return this.useDepths&&a?"depths["+
a+"]":"depth"+a},quotedString:function(a){return this.source.quotedString(a)},objectLiteral:function(a){return this.source.objectLiteral(a)},aliasable:function(a){var c=this.aliases[a];if(c)return c.referenceCount++,c;c=this.aliases[a]=this.source.wrap(a);c.aliasable=!0;c.referenceCount=1;return c},setupHelper:function(a,c,d){var b=[];a=this.setupHelperArgs(c,a,b,d);c=this.nameLookup("helpers",c,"helper");return{params:b,paramsInit:a,name:c,callParams:[this.contextName(0)].concat(b)}},setupParams:function(a,
c,d){var b={},f=[],g=[],l=[],n=!d,e=void 0;n&&(d=[]);b.name=this.quotedString(a);b.hash=this.popStack();this.trackIds&&(b.hashIds=this.popStack());this.stringParams&&(b.hashTypes=this.popStack(),b.hashContexts=this.popStack());e=this.popStack();if((a=this.popStack())||e)b.fn=a||"container.noop",b.inverse=e||"container.noop";for(;c--;)e=this.popStack(),d[c]=e,this.trackIds&&(l[c]=this.popStack()),this.stringParams&&(g[c]=this.popStack(),f[c]=this.popStack());n&&(b.args=this.source.generateArray(d));
this.trackIds&&(b.ids=this.source.generateArray(l));this.stringParams&&(b.types=this.source.generateArray(g),b.contexts=this.source.generateArray(f));this.options.data&&(b.data="data");this.useBlockParams&&(b.blockParams="blockParams");return b},setupHelperArgs:function(a,c,d,b){a=this.setupParams(a,c,d);a=this.objectLiteral(a);return b?(this.useRegister("options"),d.push("options"),["options=",a]):d?(d.push(a),""):a}};(function(){for(var a="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "),
c=p.RESERVED_WORDS={},d=0,b=a.length;d<b;d++)c[a[d]]=!0})();p.isValidJavaScriptVariableName=function(a){return!p.RESERVED_WORDS[a]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a)};b["default"]=p;k.exports=b["default"]},function(k,b,e){function m(){this.parents=[]}function p(a){this.acceptRequired(a,"path");this.acceptArray(a.params);this.acceptKey(a,"hash")}function l(a){p.call(this,a);this.acceptKey(a,"program");this.acceptKey(a,"inverse")}function a(a){this.acceptRequired(a,"name");this.acceptArray(a.params);
this.acceptKey(a,"hash")}var f=e(8)["default"];b.__esModule=!0;e=e(12);var n=f(e);m.prototype={constructor:m,mutating:!1,acceptKey:function(a,b){var c=this.accept(a[b]);if(this.mutating){if(c&&!m.prototype[c.type])throw new n["default"]('Unexpected node type "'+c.type+'" found when accepting '+b+" on "+a.type);a[b]=c}},acceptRequired:function(a,b){this.acceptKey(a,b);if(!a[b])throw new n["default"](a.type+" requires "+b);},acceptArray:function(a){for(var b=0,c=a.length;b<c;b++)this.acceptKey(a,b),
a[b]||(a.splice(b,1),b--,c--)},accept:function(a){if(a){if(!this[a.type])throw new n["default"]("Unknown type: "+a.type,a);this.current&&this.parents.unshift(this.current);this.current=a;var b=this[a.type](a);this.current=this.parents.shift();if(!this.mutating||b)return b;if(!1!==b)return a}},Program:function(a){this.acceptArray(a.body)},MustacheStatement:p,Decorator:p,BlockStatement:l,DecoratorBlock:l,PartialStatement:a,PartialBlockStatement:function(b){a.call(this,b);this.acceptKey(b,"program")},
ContentStatement:function(){},CommentStatement:function(){},SubExpression:p,PathExpression:function(){},StringLiteral:function(){},NumberLiteral:function(){},BooleanLiteral:function(){},UndefinedLiteral:function(){},NullLiteral:function(){},Hash:function(a){this.acceptArray(a.pairs)},HashPair:function(a){this.acceptRequired(a,"value")}};b["default"]=m;k.exports=b["default"]},function(k,b,e){(function(e){b.__esModule=!0;b["default"]=function(b){var l="undefined"!==typeof e?e:window,a=l.Handlebars;
b.noConflict=function(){l.Handlebars===b&&(l.Handlebars=a)}};k.exports=b["default"]}).call(b,function(){return this}())},function(k,b,e){b["default"]=function(b){return b&&b.__esModule?b:{"default":b}};b.__esModule=!0},function(k,b,e){b["default"]=function(b){if(b&&b.__esModule)return b;var e={};if(null!=b)for(var l in b)Object.prototype.hasOwnProperty.call(b,l)&&(e[l]=b[l]);e["default"]=b;return e};b.__esModule=!0},function(k,b,e){function m(a,b,c){this.helpers=a||{};this.partials=b||{};this.decorators=
c||{};f.registerDefaultHelpers(this);n.registerDefaultDecorators(this)}k=e(8)["default"];b.__esModule=!0;b.HandlebarsEnvironment=m;var p=e(13),l=e(12),a=k(l),f=e(19),n=e(20);e=e(21);e=k(e);b.VERSION="4.0.2";b.COMPILER_REVISION=7;b.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};m.prototype={constructor:m,logger:e["default"],log:e["default"].log,registerHelper:function(b,f){if("[object Object]"===p.toString.call(b)){if(f)throw new a["default"]("Arg not supported with multiple helpers");
p.extend(this.helpers,b)}else this.helpers[b]=f},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(b,f){if("[object Object]"===p.toString.call(b))p.extend(this.partials,b);else{if("undefined"===typeof f)throw new a["default"]("Attempting to register a partial as undefined");this.partials[b]=f}},unregisterPartial:function(a){delete this.partials[a]},registerDecorator:function(b,f){if("[object Object]"===p.toString.call(b)){if(f)throw new a["default"]("Arg not supported with multiple decorators");
p.extend(this.decorators,b)}else this.decorators[b]=f},unregisterDecorator:function(a){delete this.decorators[a]}};b.log=e["default"].log;b.createFrame=p.createFrame;b.logger=e["default"]},function(k,b,e){function m(b){this.string=b}b.__esModule=!0;m.prototype.toString=m.prototype.toHTML=function(){return""+this.string};b["default"]=m;k.exports=b["default"]},function(k,b,e){function m(b,a){var f=a&&a.loc,n=void 0,d=void 0;f&&(n=f.start.line,d=f.start.column,b+=" - "+n+":"+d);for(var g=Error.prototype.constructor.call(this,
b),c=0;c<p.length;c++)this[p[c]]=g[p[c]];Error.captureStackTrace&&Error.captureStackTrace(this,m);f&&(this.lineNumber=n,this.column=d)}b.__esModule=!0;var p="description fileName lineNumber message name number stack".split(" ");m.prototype=Error();b["default"]=m;k.exports=b["default"]},function(k,b,e){function m(a){return l[a]}function p(a){for(var c=1;c<arguments.length;c++)for(var b in arguments[c])Object.prototype.hasOwnProperty.call(arguments[c],b)&&(a[b]=arguments[c][b]);return a}b.__esModule=
!0;b.extend=p;b.indexOf=function(a,c){for(var b=0,d=a.length;b<d;b++)if(a[b]===c)return b;return-1};b.escapeExpression=function(b){if("string"!==typeof b){if(b&&b.toHTML)return b.toHTML();if(null==b)return"";if(!b)return b+"";b=""+b}return f.test(b)?b.replace(a,m):b};b.isEmpty=function(a){return a||0===a?d(a)&&0===a.length?!0:!1:!0};b.createFrame=function(a){var c=p({},a);c._parent=a;return c};b.blockParams=function(a,c){a.path=c;return a};b.appendContextPath=function(a,c){return(a?a+".":"")+c};var l=
{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},a=/[&<>"'`=]/g,f=/[&<>"'`=]/,n=Object.prototype.toString;b.toString=n;k=function(a){return"function"===typeof a};k(/x/)&&(b.isFunction=k=function(a){return"function"===typeof a&&"[object Function]"===n.call(a)});b.isFunction=k;var d=Array.isArray||function(a){return a&&"object"===typeof a?"[object Array]"===n.call(a):!1};b.isArray=d},function(k,b,e){function m(c,b,d,f,g,l,n){function e(a){var b=1>=arguments.length||
void 0===arguments[1]?{}:arguments[1],h=n;n&&a!==n[0]&&(h=[a].concat(n));return d(c,a,c.helpers,c.partials,b.data||f,l&&[b.blockParams].concat(l),h)}e=a(d,e,c,n,f,l);e.program=b;e.depth=n?n.length:0;e.blockParams=g||0;return e}function p(){return""}function l(a,b){b&&"root"in b||(b=b?g.createFrame(b):{},b.root=a);return b}function a(a,b,d,f,g,l){if(a.decorator){var e={};b=a.decorator(b,e,d,f&&f[0],g,l,f);n.extend(b,e)}return b}var f=e(9)["default"];k=e(8)["default"];b.__esModule=!0;b.checkRevision=
function(a){var b=a&&a[0]||1,f=g.COMPILER_REVISION;if(b!==f){if(b<f)throw new d["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+g.REVISION_CHANGES[f]+") or downgrade your runtime to an older version ("+g.REVISION_CHANGES[b]+").");throw new d["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").");
}};b.template=function(c,b){function f(b){function d(a){return""+c.main(g,a,g.helpers,g.partials,n,m,e)}var h=1>=arguments.length||void 0===arguments[1]?{}:arguments[1],n=h.data;f._setup(h);!h.partial&&c.useData&&(n=l(b,n));var e=void 0,m=c.useBlockParams?[]:void 0;c.useDepths&&(e=h.depths?b!==h.depths[0]?[b].concat(h.depths):h.depths:[b]);d=a(c.main,d,g,h.depths||[],n,m);return d(b,h)}if(!b)throw new d["default"]("No environment passed to template");if(!c||!c.main)throw new d["default"]("Unknown template object: "+
typeof c);c.main.decorator=c.main_d;b.VM.checkRevision(c.compiler);var g={strict:function(a,c){if(!(c in a))throw new d["default"]('"'+c+'" not defined in '+a);return a[c]},lookup:function(a,c){for(var b=a.length,d=0;d<b;d++)if(a[d]&&null!=a[d][c])return a[d][c]},lambda:function(a,c){return"function"===typeof a?a.call(c):a},escapeExpression:n.escapeExpression,invokePartial:function(a,f,g){g.hash&&(f=n.extend({},f,g.hash),g.ids&&(g.ids[0]=!0));a=b.VM.resolvePartial.call(this,a,f,g);var l=b.VM.invokePartial.call(this,
a,f,g);null==l&&b.compile&&(g.partials[g.name]=b.compile(a,c.compilerOptions,b),l=g.partials[g.name](f,g));if(null!=l){if(g.indent){a=l.split("\n");f=0;for(l=a.length;f<l&&(a[f]||f+1!==l);f++)a[f]=g.indent+a[f];l=a.join("\n")}return l}throw new d["default"]("The partial "+g.name+" could not be compiled when running in runtime-only mode");},fn:function(a){var b=c[a];b.decorator=c[a+"_d"];return b},programs:[],program:function(a,c,b,d,f){var g=this.programs[a],l=this.fn(a);c||f||d||b?g=m(this,a,l,c,
b,d,f):g||(g=this.programs[a]=m(this,a,l));return g},data:function(a,c){for(;a&&c--;)a=a._parent;return a},merge:function(a,c){var b=a||c;a&&c&&a!==c&&(b=n.extend({},c,a));return b},noop:b.VM.noop,compilerInfo:c.compiler};f.isTop=!0;f._setup=function(a){if(a.partial)g.helpers=a.helpers,g.partials=a.partials,g.decorators=a.decorators;else if(g.helpers=g.merge(a.helpers,b.helpers),c.usePartial&&(g.partials=g.merge(a.partials,b.partials)),c.usePartial||c.useDecorators)g.decorators=g.merge(a.decorators,
b.decorators)};f._child=function(a,b,f,l){if(c.useBlockParams&&!f)throw new d["default"]("must pass block params");if(c.useDepths&&!l)throw new d["default"]("must pass parent depths");return m(g,a,c[a],b,0,f,l)};return f};b.wrapProgram=m;b.resolvePartial=function(a,b,d){a?a.call||d.name||(d.name=a,a=d.partials[a]):a="@partial-block"===d.name?d.data["partial-block"]:d.partials[d.name];return a};b.invokePartial=function(a,b,f){f.partial=!0;f.ids&&(f.data.contextPath=f.ids[0]||f.data.contextPath);var g=
void 0;f.fn&&f.fn!==p&&(g=f.data["partial-block"]=f.fn,g.partials&&(f.partials=n.extend({},f.partials,g.partials)));void 0===a&&g&&(a=g);if(void 0===a)throw new d["default"]("The partial "+f.name+" could not be found");if(a instanceof Function)return a(b,f)};b.noop=p;b=e(13);var n=f(b);b=e(12);var d=k(b),g=e(10)},function(k,b,e){k=function(){function b(){this.yy={}}var e={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,
partial:11,partialBlock:12,content:13,COMMENT:14,CONTENT:15,openRawBlock:16,rawBlock_repetition_plus0:17,END_RAW_BLOCK:18,OPEN_RAW_BLOCK:19,helperName:20,openRawBlock_repetition0:21,openRawBlock_option0:22,CLOSE_RAW_BLOCK:23,openBlock:24,block_option0:25,closeBlock:26,openInverse:27,block_option1:28,OPEN_BLOCK:29,openBlock_repetition0:30,openBlock_option0:31,openBlock_option1:32,CLOSE:33,OPEN_INVERSE:34,openInverse_repetition0:35,openInverse_option0:36,openInverse_option1:37,openInverseChain:38,OPEN_INVERSE_CHAIN:39,
openInverseChain_repetition0:40,openInverseChain_option0:41,openInverseChain_option1:42,inverseAndProgram:43,INVERSE:44,inverseChain:45,inverseChain_option0:46,OPEN_ENDBLOCK:47,OPEN:48,mustache_repetition0:49,mustache_option0:50,OPEN_UNESCAPED:51,mustache_repetition1:52,mustache_option1:53,CLOSE_UNESCAPED:54,OPEN_PARTIAL:55,partialName:56,partial_repetition0:57,partial_option0:58,openPartialBlock:59,OPEN_PARTIAL_BLOCK:60,openPartialBlock_repetition0:61,openPartialBlock_option0:62,param:63,sexpr:64,
OPEN_SEXPR:65,sexpr_repetition0:66,sexpr_option0:67,CLOSE_SEXPR:68,hash:69,hash_repetition_plus0:70,hashSegment:71,ID:72,EQUALS:73,blockParams:74,OPEN_BLOCK_PARAMS:75,blockParams_repetition_plus0:76,CLOSE_BLOCK_PARAMS:77,path:78,dataName:79,STRING:80,NUMBER:81,BOOLEAN:82,UNDEFINED:83,NULL:84,DATA:85,pathSegments:86,SEP:87,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"COMMENT",15:"CONTENT",18:"END_RAW_BLOCK",19:"OPEN_RAW_BLOCK",23:"CLOSE_RAW_BLOCK",29:"OPEN_BLOCK",33:"CLOSE",34:"OPEN_INVERSE",
39:"OPEN_INVERSE_CHAIN",44:"INVERSE",47:"OPEN_ENDBLOCK",48:"OPEN",51:"OPEN_UNESCAPED",54:"CLOSE_UNESCAPED",55:"OPEN_PARTIAL",60:"OPEN_PARTIAL_BLOCK",65:"OPEN_SEXPR",68:"CLOSE_SEXPR",72:"ID",73:"EQUALS",75:"OPEN_BLOCK_PARAMS",77:"CLOSE_BLOCK_PARAMS",80:"STRING",81:"NUMBER",82:"BOOLEAN",83:"UNDEFINED",84:"NULL",85:"DATA",87:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[13,1],[10,3],[16,5],[9,4],[9,4],[24,6],[27,6],[38,6],[43,2],[45,3],[45,1],[26,3],[8,5],[8,5],[11,5],
[12,3],[59,5],[63,1],[63,1],[64,5],[69,1],[71,3],[74,3],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[56,1],[56,1],[79,2],[78,1],[86,3],[86,1],[6,0],[6,2],[17,1],[17,2],[21,0],[21,2],[22,0],[22,1],[25,0],[25,1],[28,0],[28,1],[30,0],[30,2],[31,0],[31,1],[32,0],[32,1],[35,0],[35,2],[36,0],[36,1],[37,0],[37,1],[40,0],[40,2],[41,0],[41,1],[42,0],[42,1],[46,0],[46,1],[49,0],[49,2],[50,0],[50,1],[52,0],[52,2],[53,0],[53,1],[57,0],[57,2],[58,0],[58,1],[61,0],[61,2],[62,0],[62,1],[66,0],[66,2],[67,0],
[67,1],[70,1],[70,2],[76,1],[76,2]],performAction:function(a,b,l,d,g,c,h){a=c.length-1;switch(g){case 1:return c[a-1];case 2:this.$=d.prepareProgram(c[a]);break;case 3:this.$=c[a];break;case 4:this.$=c[a];break;case 5:this.$=c[a];break;case 6:this.$=c[a];break;case 7:this.$=c[a];break;case 8:this.$=c[a];break;case 9:this.$={type:"CommentStatement",value:d.stripComment(c[a]),strip:d.stripFlags(c[a],c[a]),loc:d.locInfo(this._$)};break;case 10:this.$={type:"ContentStatement",original:c[a],value:c[a],
loc:d.locInfo(this._$)};break;case 11:this.$=d.prepareRawBlock(c[a-2],c[a-1],c[a],this._$);break;case 12:this.$={path:c[a-3],params:c[a-2],hash:c[a-1]};break;case 13:this.$=d.prepareBlock(c[a-3],c[a-2],c[a-1],c[a],!1,this._$);break;case 14:this.$=d.prepareBlock(c[a-3],c[a-2],c[a-1],c[a],!0,this._$);break;case 15:this.$={open:c[a-5],path:c[a-4],params:c[a-3],hash:c[a-2],blockParams:c[a-1],strip:d.stripFlags(c[a-5],c[a])};break;case 16:this.$={path:c[a-4],params:c[a-3],hash:c[a-2],blockParams:c[a-1],
strip:d.stripFlags(c[a-5],c[a])};break;case 17:this.$={path:c[a-4],params:c[a-3],hash:c[a-2],blockParams:c[a-1],strip:d.stripFlags(c[a-5],c[a])};break;case 18:this.$={strip:d.stripFlags(c[a-1],c[a-1]),program:c[a]};break;case 19:g=d.prepareBlock(c[a-2],c[a-1],c[a],c[a],!1,this._$);d=d.prepareProgram([g],c[a-1].loc);d.chained=!0;this.$={strip:c[a-2].strip,program:d,chain:!0};break;case 20:this.$=c[a];break;case 21:this.$={path:c[a-1],strip:d.stripFlags(c[a-2],c[a])};break;case 22:this.$=d.prepareMustache(c[a-
3],c[a-2],c[a-1],c[a-4],d.stripFlags(c[a-4],c[a]),this._$);break;case 23:this.$=d.prepareMustache(c[a-3],c[a-2],c[a-1],c[a-4],d.stripFlags(c[a-4],c[a]),this._$);break;case 24:this.$={type:"PartialStatement",name:c[a-3],params:c[a-2],hash:c[a-1],indent:"",strip:d.stripFlags(c[a-4],c[a]),loc:d.locInfo(this._$)};break;case 25:this.$=d.preparePartialBlock(c[a-2],c[a-1],c[a],this._$);break;case 26:this.$={path:c[a-3],params:c[a-2],hash:c[a-1],strip:d.stripFlags(c[a-4],c[a])};break;case 27:this.$=c[a];
break;case 28:this.$=c[a];break;case 29:this.$={type:"SubExpression",path:c[a-3],params:c[a-2],hash:c[a-1],loc:d.locInfo(this._$)};break;case 30:this.$={type:"Hash",pairs:c[a],loc:d.locInfo(this._$)};break;case 31:this.$={type:"HashPair",key:d.id(c[a-2]),value:c[a],loc:d.locInfo(this._$)};break;case 32:this.$=d.id(c[a-1]);break;case 33:this.$=c[a];break;case 34:this.$=c[a];break;case 35:this.$={type:"StringLiteral",value:c[a],original:c[a],loc:d.locInfo(this._$)};break;case 36:this.$={type:"NumberLiteral",
value:Number(c[a]),original:Number(c[a]),loc:d.locInfo(this._$)};break;case 37:this.$={type:"BooleanLiteral",value:"true"===c[a],original:"true"===c[a],loc:d.locInfo(this._$)};break;case 38:this.$={type:"UndefinedLiteral",original:void 0,value:void 0,loc:d.locInfo(this._$)};break;case 39:this.$={type:"NullLiteral",original:null,value:null,loc:d.locInfo(this._$)};break;case 40:this.$=c[a];break;case 41:this.$=c[a];break;case 42:this.$=d.preparePath(!0,c[a],this._$);break;case 43:this.$=d.preparePath(!1,
c[a],this._$);break;case 44:c[a-2].push({part:d.id(c[a]),original:c[a],separator:c[a-1]});this.$=c[a-2];break;case 45:this.$=[{part:d.id(c[a]),original:c[a]}];break;case 46:this.$=[];break;case 47:c[a-1].push(c[a]);break;case 48:this.$=[c[a]];break;case 49:c[a-1].push(c[a]);break;case 50:this.$=[];break;case 51:c[a-1].push(c[a]);break;case 58:this.$=[];break;case 59:c[a-1].push(c[a]);break;case 64:this.$=[];break;case 65:c[a-1].push(c[a]);break;case 70:this.$=[];break;case 71:c[a-1].push(c[a]);break;
case 78:this.$=[];break;case 79:c[a-1].push(c[a]);break;case 82:this.$=[];break;case 83:c[a-1].push(c[a]);break;case 86:this.$=[];break;case 87:c[a-1].push(c[a]);break;case 90:this.$=[];break;case 91:c[a-1].push(c[a]);break;case 94:this.$=[];break;case 95:c[a-1].push(c[a]);break;case 98:this.$=[c[a]];break;case 99:c[a-1].push(c[a]);break;case 100:this.$=[c[a]];break;case 101:c[a-1].push(c[a])}},table:[{3:1,4:2,5:[2,46],6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],48:[2,46],51:[2,46],55:[2,
46],60:[2,46]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:[1,12],15:[1,20],16:17,19:[1,23],24:15,27:16,29:[1,21],34:[1,22],39:[2,2],44:[2,2],47:[2,2],48:[1,13],51:[1,14],55:[1,18],59:19,60:[1,24]},{1:[2,1]},{5:[2,47],14:[2,47],15:[2,47],19:[2,47],29:[2,47],34:[2,47],39:[2,47],44:[2,47],47:[2,47],48:[2,47],51:[2,47],55:[2,47],60:[2,47]},{5:[2,3],14:[2,3],15:[2,3],19:[2,3],29:[2,3],34:[2,3],39:[2,3],44:[2,3],47:[2,3],48:[2,3],51:[2,3],55:[2,3],60:[2,3]},{5:[2,4],14:[2,4],15:[2,
4],19:[2,4],29:[2,4],34:[2,4],39:[2,4],44:[2,4],47:[2,4],48:[2,4],51:[2,4],55:[2,4],60:[2,4]},{5:[2,5],14:[2,5],15:[2,5],19:[2,5],29:[2,5],34:[2,5],39:[2,5],44:[2,5],47:[2,5],48:[2,5],51:[2,5],55:[2,5],60:[2,5]},{5:[2,6],14:[2,6],15:[2,6],19:[2,6],29:[2,6],34:[2,6],39:[2,6],44:[2,6],47:[2,6],48:[2,6],51:[2,6],55:[2,6],60:[2,6]},{5:[2,7],14:[2,7],15:[2,7],19:[2,7],29:[2,7],34:[2,7],39:[2,7],44:[2,7],47:[2,7],48:[2,7],51:[2,7],55:[2,7],60:[2,7]},{5:[2,8],14:[2,8],15:[2,8],19:[2,8],29:[2,8],34:[2,8],
39:[2,8],44:[2,8],47:[2,8],48:[2,8],51:[2,8],55:[2,8],60:[2,8]},{5:[2,9],14:[2,9],15:[2,9],19:[2,9],29:[2,9],34:[2,9],39:[2,9],44:[2,9],47:[2,9],48:[2,9],51:[2,9],55:[2,9],60:[2,9]},{20:25,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:36,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:37,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},
{4:38,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{13:40,15:[1,20],17:39},{20:42,56:41,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:45,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{5:[2,10],14:[2,10],15:[2,10],18:[2,10],19:[2,10],29:[2,10],34:[2,10],39:[2,10],44:[2,10],47:[2,10],48:[2,10],51:[2,10],55:[2,10],
60:[2,10]},{20:46,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:47,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:48,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:42,56:49,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[2,78],49:50,65:[2,78],72:[2,78],80:[2,78],81:[2,78],82:[2,78],83:[2,78],84:[2,78],
85:[2,78]},{23:[2,33],33:[2,33],54:[2,33],65:[2,33],68:[2,33],72:[2,33],75:[2,33],80:[2,33],81:[2,33],82:[2,33],83:[2,33],84:[2,33],85:[2,33]},{23:[2,34],33:[2,34],54:[2,34],65:[2,34],68:[2,34],72:[2,34],75:[2,34],80:[2,34],81:[2,34],82:[2,34],83:[2,34],84:[2,34],85:[2,34]},{23:[2,35],33:[2,35],54:[2,35],65:[2,35],68:[2,35],72:[2,35],75:[2,35],80:[2,35],81:[2,35],82:[2,35],83:[2,35],84:[2,35],85:[2,35]},{23:[2,36],33:[2,36],54:[2,36],65:[2,36],68:[2,36],72:[2,36],75:[2,36],80:[2,36],81:[2,36],82:[2,
36],83:[2,36],84:[2,36],85:[2,36]},{23:[2,37],33:[2,37],54:[2,37],65:[2,37],68:[2,37],72:[2,37],75:[2,37],80:[2,37],81:[2,37],82:[2,37],83:[2,37],84:[2,37],85:[2,37]},{23:[2,38],33:[2,38],54:[2,38],65:[2,38],68:[2,38],72:[2,38],75:[2,38],80:[2,38],81:[2,38],82:[2,38],83:[2,38],84:[2,38],85:[2,38]},{23:[2,39],33:[2,39],54:[2,39],65:[2,39],68:[2,39],72:[2,39],75:[2,39],80:[2,39],81:[2,39],82:[2,39],83:[2,39],84:[2,39],85:[2,39]},{23:[2,43],33:[2,43],54:[2,43],65:[2,43],68:[2,43],72:[2,43],75:[2,43],
80:[2,43],81:[2,43],82:[2,43],83:[2,43],84:[2,43],85:[2,43],87:[1,51]},{72:[1,35],86:52},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{52:53,54:[2,82],65:[2,82],72:[2,82],80:[2,82],81:[2,82],82:[2,82],83:[2,82],84:[2,82],85:[2,82]},{25:54,38:56,39:[1,58],43:57,44:[1,59],45:55,47:[2,54]},{28:60,43:61,44:[1,59],47:[2,56]},{13:63,15:[1,20],18:[1,62]},{15:[2,48],18:[2,48]},{33:[2,86],57:64,65:[2,86],72:[2,
86],80:[2,86],81:[2,86],82:[2,86],83:[2,86],84:[2,86],85:[2,86]},{33:[2,40],65:[2,40],72:[2,40],80:[2,40],81:[2,40],82:[2,40],83:[2,40],84:[2,40],85:[2,40]},{33:[2,41],65:[2,41],72:[2,41],80:[2,41],81:[2,41],82:[2,41],83:[2,41],84:[2,41],85:[2,41]},{20:65,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:66,47:[1,67]},{30:68,33:[2,58],65:[2,58],72:[2,58],75:[2,58],80:[2,58],81:[2,58],82:[2,58],83:[2,58],84:[2,58],85:[2,58]},{33:[2,64],35:69,65:[2,64],72:[2,
64],75:[2,64],80:[2,64],81:[2,64],82:[2,64],83:[2,64],84:[2,64],85:[2,64]},{21:70,23:[2,50],65:[2,50],72:[2,50],80:[2,50],81:[2,50],82:[2,50],83:[2,50],84:[2,50],85:[2,50]},{33:[2,90],61:71,65:[2,90],72:[2,90],80:[2,90],81:[2,90],82:[2,90],83:[2,90],84:[2,90],85:[2,90]},{20:75,33:[2,80],50:72,63:73,64:76,65:[1,44],69:74,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{72:[1,80]},{23:[2,42],33:[2,42],54:[2,42],65:[2,42],68:[2,42],72:[2,42],75:[2,
42],80:[2,42],81:[2,42],82:[2,42],83:[2,42],84:[2,42],85:[2,42],87:[1,51]},{20:75,53:81,54:[2,84],63:82,64:76,65:[1,44],69:83,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:84,47:[1,67]},{47:[2,55]},{4:85,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{47:[2,20]},{20:86,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:87,
6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{26:88,47:[1,67]},{47:[2,57]},{5:[2,11],14:[2,11],15:[2,11],19:[2,11],29:[2,11],34:[2,11],39:[2,11],44:[2,11],47:[2,11],48:[2,11],51:[2,11],55:[2,11],60:[2,11]},{15:[2,49],18:[2,49]},{20:75,33:[2,88],58:89,63:90,64:76,65:[1,44],69:91,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{65:[2,94],66:92,68:[2,94],72:[2,94],80:[2,94],81:[2,94],82:[2,
94],83:[2,94],84:[2,94],85:[2,94]},{5:[2,25],14:[2,25],15:[2,25],19:[2,25],29:[2,25],34:[2,25],39:[2,25],44:[2,25],47:[2,25],48:[2,25],51:[2,25],55:[2,25],60:[2,25]},{20:93,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,31:94,33:[2,60],63:95,64:76,65:[1,44],69:96,70:77,71:78,72:[1,79],75:[2,60],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,66],36:97,63:98,64:76,65:[1,44],69:99,70:77,71:78,72:[1,79],75:[2,
66],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,22:100,23:[2,52],63:101,64:76,65:[1,44],69:102,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,92],62:103,63:104,64:76,65:[1,44],69:105,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,106]},{33:[2,79],65:[2,79],72:[2,79],80:[2,79],81:[2,79],82:[2,79],83:[2,79],84:[2,79],85:[2,79]},{33:[2,
81]},{23:[2,27],33:[2,27],54:[2,27],65:[2,27],68:[2,27],72:[2,27],75:[2,27],80:[2,27],81:[2,27],82:[2,27],83:[2,27],84:[2,27],85:[2,27]},{23:[2,28],33:[2,28],54:[2,28],65:[2,28],68:[2,28],72:[2,28],75:[2,28],80:[2,28],81:[2,28],82:[2,28],83:[2,28],84:[2,28],85:[2,28]},{23:[2,30],33:[2,30],54:[2,30],68:[2,30],71:107,72:[1,108],75:[2,30]},{23:[2,98],33:[2,98],54:[2,98],68:[2,98],72:[2,98],75:[2,98]},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],73:[1,109],75:[2,45],80:[2,45],81:[2,45],
82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{23:[2,44],33:[2,44],54:[2,44],65:[2,44],68:[2,44],72:[2,44],75:[2,44],80:[2,44],81:[2,44],82:[2,44],83:[2,44],84:[2,44],85:[2,44],87:[2,44]},{54:[1,110]},{54:[2,83],65:[2,83],72:[2,83],80:[2,83],81:[2,83],82:[2,83],83:[2,83],84:[2,83],85:[2,83]},{54:[2,85]},{5:[2,13],14:[2,13],15:[2,13],19:[2,13],29:[2,13],34:[2,13],39:[2,13],44:[2,13],47:[2,13],48:[2,13],51:[2,13],55:[2,13],60:[2,13]},{38:56,39:[1,58],43:57,44:[1,59],45:112,46:111,47:[2,76]},{33:[2,
70],40:113,65:[2,70],72:[2,70],75:[2,70],80:[2,70],81:[2,70],82:[2,70],83:[2,70],84:[2,70],85:[2,70]},{47:[2,18]},{5:[2,14],14:[2,14],15:[2,14],19:[2,14],29:[2,14],34:[2,14],39:[2,14],44:[2,14],47:[2,14],48:[2,14],51:[2,14],55:[2,14],60:[2,14]},{33:[1,114]},{33:[2,87],65:[2,87],72:[2,87],80:[2,87],81:[2,87],82:[2,87],83:[2,87],84:[2,87],85:[2,87]},{33:[2,89]},{20:75,63:116,64:76,65:[1,44],67:115,68:[2,96],69:117,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,
34],86:33},{33:[1,118]},{32:119,33:[2,62],74:120,75:[1,121]},{33:[2,59],65:[2,59],72:[2,59],75:[2,59],80:[2,59],81:[2,59],82:[2,59],83:[2,59],84:[2,59],85:[2,59]},{33:[2,61],75:[2,61]},{33:[2,68],37:122,74:123,75:[1,121]},{33:[2,65],65:[2,65],72:[2,65],75:[2,65],80:[2,65],81:[2,65],82:[2,65],83:[2,65],84:[2,65],85:[2,65]},{33:[2,67],75:[2,67]},{23:[1,124]},{23:[2,51],65:[2,51],72:[2,51],80:[2,51],81:[2,51],82:[2,51],83:[2,51],84:[2,51],85:[2,51]},{23:[2,53]},{33:[1,125]},{33:[2,91],65:[2,91],72:[2,
91],80:[2,91],81:[2,91],82:[2,91],83:[2,91],84:[2,91],85:[2,91]},{33:[2,93]},{5:[2,22],14:[2,22],15:[2,22],19:[2,22],29:[2,22],34:[2,22],39:[2,22],44:[2,22],47:[2,22],48:[2,22],51:[2,22],55:[2,22],60:[2,22]},{23:[2,99],33:[2,99],54:[2,99],68:[2,99],72:[2,99],75:[2,99]},{73:[1,109]},{20:75,63:126,64:76,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,23],14:[2,23],15:[2,23],19:[2,23],29:[2,23],34:[2,23],39:[2,23],44:[2,23],47:[2,23],48:[2,23],
51:[2,23],55:[2,23],60:[2,23]},{47:[2,19]},{47:[2,77]},{20:75,33:[2,72],41:127,63:128,64:76,65:[1,44],69:129,70:77,71:78,72:[1,79],75:[2,72],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,24],14:[2,24],15:[2,24],19:[2,24],29:[2,24],34:[2,24],39:[2,24],44:[2,24],47:[2,24],48:[2,24],51:[2,24],55:[2,24],60:[2,24]},{68:[1,130]},{65:[2,95],68:[2,95],72:[2,95],80:[2,95],81:[2,95],82:[2,95],83:[2,95],84:[2,95],85:[2,95]},{68:[2,97]},{5:[2,21],14:[2,21],15:[2,21],19:[2,
21],29:[2,21],34:[2,21],39:[2,21],44:[2,21],47:[2,21],48:[2,21],51:[2,21],55:[2,21],60:[2,21]},{33:[1,131]},{33:[2,63]},{72:[1,133],76:132},{33:[1,134]},{33:[2,69]},{15:[2,12]},{14:[2,26],15:[2,26],19:[2,26],29:[2,26],34:[2,26],47:[2,26],48:[2,26],51:[2,26],55:[2,26],60:[2,26]},{23:[2,31],33:[2,31],54:[2,31],68:[2,31],72:[2,31],75:[2,31]},{33:[2,74],42:135,74:136,75:[1,121]},{33:[2,71],65:[2,71],72:[2,71],75:[2,71],80:[2,71],81:[2,71],82:[2,71],83:[2,71],84:[2,71],85:[2,71]},{33:[2,73],75:[2,73]},
{23:[2,29],33:[2,29],54:[2,29],65:[2,29],68:[2,29],72:[2,29],75:[2,29],80:[2,29],81:[2,29],82:[2,29],83:[2,29],84:[2,29],85:[2,29]},{14:[2,15],15:[2,15],19:[2,15],29:[2,15],34:[2,15],39:[2,15],44:[2,15],47:[2,15],48:[2,15],51:[2,15],55:[2,15],60:[2,15]},{72:[1,138],77:[1,137]},{72:[2,100],77:[2,100]},{14:[2,16],15:[2,16],19:[2,16],29:[2,16],34:[2,16],44:[2,16],47:[2,16],48:[2,16],51:[2,16],55:[2,16],60:[2,16]},{33:[1,139]},{33:[2,75]},{33:[2,32]},{72:[2,101],77:[2,101]},{14:[2,17],15:[2,17],19:[2,
17],29:[2,17],34:[2,17],39:[2,17],44:[2,17],47:[2,17],48:[2,17],51:[2,17],55:[2,17],60:[2,17]}],defaultActions:{4:[2,1],55:[2,55],57:[2,20],61:[2,57],74:[2,81],83:[2,85],87:[2,18],91:[2,89],102:[2,53],105:[2,93],111:[2,19],112:[2,77],117:[2,97],120:[2,63],123:[2,69],124:[2,12],136:[2,75],137:[2,32]},parseError:function(a,b){throw Error(a);},parse:function(a){var b=[0],l=[null],d=[],g=this.table,c="",h=0,e=0,m=0;this.lexer.setInput(a);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;this.yy.parser=this;
"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});a=this.lexer.yylloc;d.push(a);var p=this.lexer.options&&this.lexer.options.ranges;"function"===typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var k,v,t,q,w={},y,u;;){t=b[b.length-1];if(this.defaultActions[t])q=this.defaultActions[t];else{if(null===k||"undefined"==typeof k)k=void 0,k=this.lexer.lex()||1,"number"!==typeof k&&(k=this.symbols_[k]||k);q=g[t]&&g[t][k]}if("undefined"===typeof q||!q.length||!q[0]){var z="";
if(!m){u=[];for(y in g[t])this.terminals_[y]&&2<y&&u.push("'"+this.terminals_[y]+"'");z=this.lexer.showPosition?"Parse error on line "+(h+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+u.join(", ")+", got '"+(this.terminals_[k]||k)+"'":"Parse error on line "+(h+1)+": Unexpected "+(1==k?"end of input":"'"+(this.terminals_[k]||k)+"'");this.parseError(z,{text:this.lexer.match,token:this.terminals_[k]||k,line:this.lexer.yylineno,loc:a,expected:u})}}if(q[0]instanceof Array&&1<q.length)throw Error("Parse Error: multiple actions possible at state: "+
t+", token: "+k);switch(q[0]){case 1:b.push(k);l.push(this.lexer.yytext);d.push(this.lexer.yylloc);b.push(q[1]);k=null;v?(k=v,v=null):(e=this.lexer.yyleng,c=this.lexer.yytext,h=this.lexer.yylineno,a=this.lexer.yylloc,0<m&&m--);break;case 2:u=this.productions_[q[1]][1];w.$=l[l.length-u];w._$={first_line:d[d.length-(u||1)].first_line,last_line:d[d.length-1].last_line,first_column:d[d.length-(u||1)].first_column,last_column:d[d.length-1].last_column};p&&(w._$.range=[d[d.length-(u||1)].range[0],d[d.length-
1].range[1]]);t=this.performAction.call(w,c,e,h,this.yy,q[1],l,d);if("undefined"!==typeof t)return t;u&&(b=b.slice(0,-2*u),l=l.slice(0,-1*u),d=d.slice(0,-1*u));b.push(this.productions_[q[1]][0]);l.push(w.$);d.push(w._$);q=g[b[b.length-2]][b[b.length-1]];b.push(q);break;case 3:return!0}}}},l=function(){return{EOF:1,parseError:function(a,b){if(this.yy.parser)this.yy.parser.parseError(a,b);else throw Error(a);},setInput:function(a){this._input=a;this._more=this._less=this.done=!1;this.yylineno=this.yyleng=
0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};this.options.ranges&&(this.yylloc.range=[0,0]);this.offset=0;return this},input:function(){var a=this._input[0];this.yytext+=a;this.yyleng++;this.offset++;this.match+=a;this.matched+=a;a.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++;this.options.ranges&&this.yylloc.range[1]++;this._input=this._input.slice(1);return a},
unput:function(a){var b=a.length,l=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input;this.yytext=this.yytext.substr(0,this.yytext.length-b-1);this.offset-=b;a=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1);this.matched=this.matched.substr(0,this.matched.length-1);l.length-1&&(this.yylineno-=l.length-1);var d=this.yylloc.range;this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:l?(l.length===
a.length?this.yylloc.first_column:0)+a[a.length-l.length].length-l[0].length:this.yylloc.first_column-b};this.options.ranges&&(this.yylloc.range=[d[0],d[0]+this.yyleng-b]);return this},more:function(){this._more=!0;return this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(20<a.length?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;20>a.length&&(a+=this._input.substr(0,
20-a.length));return(a.substr(0,20)+(20<a.length?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),b=Array(a.length+1).join("-");return a+this.upcomingInput()+"\n"+b+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,b,l;this._more||(this.match=this.yytext="");for(var d=this._currentRules(),g=0;g<d.length&&(!(b=this._input.match(this.rules[d[g]]))||a&&!(b[0].length>a[0].length)||(a=b,l=g,this.options.flex));g++);if(a){if(b=a[0].match(/(?:\r\n?|\n).*/g))this.yylineno+=
b.length;this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:b?b[b.length-1].length-b[b.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+a[0].length};this.yytext+=a[0];this.match+=a[0];this.matches=a;this.yyleng=this.yytext.length;this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]);this._more=!1;this._input=this._input.slice(a[0].length);this.matched+=a[0];a=this.performAction.call(this,this.yy,
this,d[l],this.conditionStack[this.conditionStack.length-1]);this.done&&this._input&&(this.done=!1);if(a)return a}else return""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return"undefined"!==typeof a?a:this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-
1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(a){this.begin(a)},options:{},performAction:function(a,b,l,d){function g(a,d){return b.yytext=b.yytext.substr(a,b.yyleng-d)}switch(l){case 0:"\\\\"===b.yytext.slice(-2)?(g(0,1),this.begin("mu")):"\\"===b.yytext.slice(-1)?(g(0,1),this.begin("emu")):this.begin("mu");if(b.yytext)return 15;break;case 1:return 15;case 2:return this.popState(),15;case 3:return this.begin("raw"),15;case 4:this.popState();
if("raw"===this.conditionStack[this.conditionStack.length-1])return 15;b.yytext=b.yytext.substr(5,b.yyleng-9);return"END_RAW_BLOCK";case 5:return 15;case 6:return this.popState(),14;case 7:return 65;case 8:return 68;case 9:return 19;case 10:return this.popState(),this.begin("raw"),23;case 11:return 55;case 12:return 60;case 13:return 29;case 14:return 47;case 15:return this.popState(),44;case 16:return this.popState(),44;case 17:return 34;case 18:return 39;case 19:return 51;case 20:return 48;case 21:this.unput(b.yytext);
this.popState();this.begin("com");break;case 22:return this.popState(),14;case 23:return 48;case 24:return 73;case 25:return 72;case 26:return 72;case 27:return 87;case 29:return this.popState(),54;case 30:return this.popState(),33;case 31:return b.yytext=g(1,2).replace(/\\"/g,'"'),80;case 32:return b.yytext=g(1,2).replace(/\\'/g,"'"),80;case 33:return 85;case 34:return 82;case 35:return 82;case 36:return 83;case 37:return 84;case 38:return 81;case 39:return 75;case 40:return 77;case 41:return 72;
case 42:return 72;case 43:return"INVALID";case 44:return 5}},rules:[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{(?=[^/]))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#>)/,/^(?:\{\{(~)?#\*?)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,
/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?\*?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,
/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],conditions:{mu:{rules:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[6],inclusive:!1},raw:{rules:[3,4,5],inclusive:!1},INITIAL:{rules:[0,1,44],inclusive:!0}}}}();e.lexer=l;b.prototype=e;e.Parser=b;return new b}();b.__esModule=!0;b["default"]=k},function(k,b,e){function m(){this.options=0>=arguments.length||void 0===arguments[0]?{}:arguments[0]}
function p(a,b,c){void 0===b&&(b=a.length);var f=a[b-1];a=a[b-2];if(!f)return c;if("ContentStatement"===f.type)return(a||!c?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(f.original)}function l(a,b,c){void 0===b&&(b=-1);var f=a[b+1];a=a[b+2];if(!f)return c;if("ContentStatement"===f.type)return(a||!c?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(f.original)}function a(a,b,c){!(a=a[null==b?0:b+1])||"ContentStatement"!==a.type||!c&&a.rightStripped||(b=a.value,a.value=a.value.replace(c?/^\s+/:/^[ \t]*\r?\n?/,""),a.rightStripped=
a.value!==b)}function f(a,b,c){if((a=a[null==b?a.length-1:b-1])&&"ContentStatement"===a.type&&(c||!a.leftStripped))return b=a.value,a.value=a.value.replace(c?/\s+$/:/[ \t]+$/,""),a.leftStripped=a.value!==b,a.leftStripped}var n=e(8)["default"];b.__esModule=!0;e=e(6);n=n(e);m.prototype=new n["default"];m.prototype.Program=function(b){var g=!this.options.ignoreStandalone,c=!this.isRootSeen;this.isRootSeen=!0;for(var e=b.body,n=0,m=e.length;n<m;n++){var k=e[n],r=this.accept(k);if(r){var v=p(e,n,c),t=
l(e,n,c),q=r.openStandalone&&v,w=r.closeStandalone&&t,v=r.inlineStandalone&&v&&t;r.close&&a(e,n,!0);r.open&&f(e,n,!0);g&&v&&(a(e,n),f(e,n)&&"PartialStatement"===k.type&&(k.indent=/([ \t]+$)/.exec(e[n-1].original)[1]));g&&q&&(a((k.program||k.inverse).body),f(e,n));g&&w&&(a(e,n),f((k.inverse||k.program).body))}}return b};m.prototype.BlockStatement=m.prototype.DecoratorBlock=m.prototype.PartialBlockStatement=function(b){this.accept(b.program);this.accept(b.inverse);var g=b.program||b.inverse,c=b.program&&
b.inverse,e=c,n=c;if(c&&c.chained)for(e=c.body[0].program;n.chained;)n=n.body[n.body.length-1].program;var m={open:b.openStrip.open,close:b.closeStrip.close,openStandalone:l(g.body),closeStandalone:p((e||g).body)};b.openStrip.close&&a(g.body,null,!0);c?(c=b.inverseStrip,c.open&&f(g.body,null,!0),c.close&&a(e.body,null,!0),b.closeStrip.open&&f(n.body,null,!0),!this.options.ignoreStandalone&&p(g.body)&&l(e.body)&&(f(g.body),a(e.body))):b.closeStrip.open&&f(g.body,null,!0);return m};m.prototype.Decorator=
m.prototype.MustacheStatement=function(a){return a.strip};m.prototype.PartialStatement=m.prototype.CommentStatement=function(a){a=a.strip||{};return{inlineStandalone:!0,open:a.open,close:a.close}};b["default"]=m;k.exports=b["default"]},function(k,b,e){function m(b,a){a=a.path?a.path.original:a;if(b.path.original!==a)throw new p["default"](b.path.original+" doesn't match "+a,{loc:b.path.loc});}k=e(8)["default"];b.__esModule=!0;b.SourceLocation=function(b,a){this.source=b;this.start={line:a.first_line,
column:a.first_column};this.end={line:a.last_line,column:a.last_column}};b.id=function(b){return/^\[.*\]$/.test(b)?b.substr(1,b.length-2):b};b.stripFlags=function(b,a){return{open:"~"===b.charAt(2),close:"~"===a.charAt(a.length-3)}};b.stripComment=function(b){return b.replace(/^\{\{~?\!-?-?/,"").replace(/-?-?~?\}\}$/,"")};b.preparePath=function(b,a,f){f=this.locInfo(f);for(var e=b?"@":"",d=[],g=0,c=0,h=a.length;c<h;c++){var m=a[c].part,k=a[c].original!==m,e=e+((a[c].separator||"")+m);if(k||".."!==
m&&"."!==m&&"this"!==m)d.push(m);else{if(0<d.length)throw new p["default"]("Invalid path: "+e,{loc:f});".."===m&&g++}}return{type:"PathExpression",data:b,depth:g,parts:d,original:e,loc:f}};b.prepareMustache=function(b,a,f,e,d,g){var c=e.charAt(3)||e.charAt(2),c="{"!==c&&"&"!==c;return{type:/\*/.test(e)?"Decorator":"MustacheStatement",path:b,params:a,hash:f,escaped:c,strip:d,loc:this.locInfo(g)}};b.prepareRawBlock=function(b,a,f,e){m(b,f);e=this.locInfo(e);return{type:"BlockStatement",path:b.path,
params:b.params,hash:b.hash,program:{type:"Program",body:a,strip:{},loc:e},openStrip:{},inverseStrip:{},closeStrip:{},loc:e}};b.prepareBlock=function(b,a,f,e,d,g){e&&e.path&&m(b,e);var c=/\*/.test(b.open);a.blockParams=b.blockParams;var h=void 0,k=void 0;if(f){if(c)throw new p["default"]("Unexpected inverse block on decorator",f);f.chain&&(f.program.body[0].closeStrip=e.strip);k=f.strip;h=f.program}d&&(d=h,h=a,a=d);return{type:c?"DecoratorBlock":"BlockStatement",path:b.path,params:b.params,hash:b.hash,
program:a,inverse:h,openStrip:b.strip,inverseStrip:k,closeStrip:e&&e.strip,loc:this.locInfo(g)}};b.prepareProgram=function(b,a){if(!a&&b.length){var f=b[0].loc,e=b[b.length-1].loc;f&&e&&(a={source:f.source,start:{line:f.start.line,column:f.start.column},end:{line:e.end.line,column:e.end.column}})}return{type:"Program",body:b,strip:{},loc:a}};b.preparePartialBlock=function(b,a,f,e){m(b,f);return{type:"PartialBlockStatement",name:b.path,params:b.params,hash:b.hash,program:a,openStrip:b.strip,closeStrip:f&&
f.strip,loc:this.locInfo(e)}};b=e(12);var p=k(b)},function(k,b,e){function m(a,b,d){if(l.isArray(a)){for(var e=[],c=0,h=a.length;c<h;c++)e.push(b.wrap(a[c],d));return e}return"boolean"===typeof a||"number"===typeof a?a+"":a}function p(a){this.srcFile=a;this.source=[]}b.__esModule=!0;var l=e(13),a=void 0;a||(a=function(a,b,d,e){this.src="";e&&this.add(e)},a.prototype={add:function(a){l.isArray(a)&&(a=a.join(""));this.src+=a},prepend:function(a){l.isArray(a)&&(a=a.join(""));this.src=a+this.src},toStringWithSourceMap:function(){return{code:this.toString()}},
toString:function(){return this.src}});p.prototype={isEmpty:function(){return!this.source.length},prepend:function(a,b){this.source.unshift(this.wrap(a,b))},push:function(a,b){this.source.push(this.wrap(a,b))},merge:function(){var a=this.empty();this.each(function(b){a.add(["  ",b,"\n"])});return a},each:function(a){for(var b=0,d=this.source.length;b<d;b++)a(this.source[b])},empty:function(){var b=this.currentLocation||{start:{}};return new a(b.start.line,b.start.column,this.srcFile)},wrap:function(b){var e=
1>=arguments.length||void 0===arguments[1]?this.currentLocation||{start:{}}:arguments[1];if(b instanceof a)return b;b=m(b,this,e);return new a(e.start.line,e.start.column,this.srcFile,b)},functionCall:function(a,b,d){d=this.generateList(d);return this.wrap([a,b?"."+b+"(":"(",d,")"])},quotedString:function(a){return'"'+(a+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(a){var b=
[],d;for(d in a)if(a.hasOwnProperty(d)){var e=m(a[d],this);"undefined"!==e&&b.push([this.quotedString(d),":",e])}a=this.generateList(b);a.prepend("{");a.add("}");return a},generateList:function(a){for(var b=this.empty(),d=0,e=a.length;d<e;d++)d&&b.add(","),b.add(m(a[d],this));return b},generateArray:function(a){a=this.generateList(a);a.prepend("[");a.add("]");return a}};b["default"]=p;k.exports=b["default"]},function(k,b,e){k=e(8)["default"];b.__esModule=!0;b.registerDefaultHelpers=function(b){m["default"](b);
p["default"](b);l["default"](b);a["default"](b);f["default"](b);n["default"](b);d["default"](b)};b=e(22);var m=k(b);b=e(23);var p=k(b);b=e(24);var l=k(b);b=e(25);var a=k(b);b=e(26);var f=k(b);b=e(27);var n=k(b);e=e(28);var d=k(e)},function(k,b,e){k=e(8)["default"];b.__esModule=!0;b.registerDefaultDecorators=function(b){m["default"](b)};b=e(29);var m=k(b)},function(k,b,e){b.__esModule=!0;var m={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(b){if("string"===typeof b){var e=
m.methodMap.indexOf(b.toLowerCase());b=0<=e?e:parseInt(b,10)}return b},log:function(b){b=m.lookupLevel(b);if("undefined"!==typeof console&&m.lookupLevel(m.level)<=b){var e=m.methodMap[b];console[e]||(e="log");for(var a=arguments.length,f=Array(1<a?a-1:0),n=1;n<a;n++)f[n-1]=arguments[n];console[e].apply(console,f)}}};b["default"]=m;k.exports=b["default"]},function(k,b,e){b.__esModule=!0;var m=e(13);b["default"]=function(b){b.registerHelper("blockHelperMissing",function(e,a){var f=a.inverse,n=a.fn;
if(!0===e)return n(this);if(!1===e||null==e)return f(this);if(m.isArray(e))return 0<e.length?(a.ids&&(a.ids=[a.name]),b.helpers.each(e,a)):f(this);a.data&&a.ids&&(f=m.createFrame(a.data),f.contextPath=m.appendContextPath(a.data.contextPath,a.name),a={data:f});return n(e,a)})};k.exports=b["default"]},function(k,b,e){var m=e(8)["default"];b.__esModule=!0;var p=e(13);e=e(12);var l=m(e);b["default"]=function(a){a.registerHelper("each",function(a,b){function d(b,c,d){null!=a[b]&&(k&&(k.key=b,k.index=c,
k.first=0===c,k.last=!!d,x&&(k.contextPath=x+b)),m+=e(a[b],{data:k,blockParams:p.blockParams([a[b],b],[x+b,null])}))}if(!b)throw new l["default"]("Must pass iterator to #each");var e=b.fn,c=b.inverse,h=0,m="",k=void 0,x=void 0;b.data&&b.ids&&(x=p.appendContextPath(b.data.contextPath,b.ids[0])+".");p.isFunction(a)&&(a=a.call(this));b.data&&(k=p.createFrame(b.data));if(a&&"object"===typeof a)if(p.isArray(a))for(var r=a.length;h<r;h++)d(h,h,h===a.length-1);else{var r=void 0,v;for(v in a)a.hasOwnProperty(v)&&
(void 0!==r&&d(r,h-1),r=v,h++);void 0!==r&&d(r,h-1,!0)}0===h&&(m=c(this));return m})};k.exports=b["default"]},function(k,b,e){var m=e(8)["default"];b.__esModule=!0;e=e(12);var p=m(e);b["default"]=function(b){b.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new p["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"');})};k.exports=b["default"]},function(k,b,e){b.__esModule=!0;var m=e(13);b["default"]=function(b){b.registerHelper("if",function(b,a){m.isFunction(b)&&
(b=b.call(this));return!a.hash.includeZero&&!b||m.isEmpty(b)?a.inverse(this):a.fn(this)});b.registerHelper("unless",function(e,a){return b.helpers["if"].call(this,e,{fn:a.inverse,inverse:a.fn,hash:a.hash})})};k.exports=b["default"]},function(k,b,e){b.__esModule=!0;b["default"]=function(b){b.registerHelper("log",function(){for(var e=[void 0],l=arguments[arguments.length-1],a=0;a<arguments.length-1;a++)e.push(arguments[a]);a=1;null!=l.hash.level?a=l.hash.level:l.data&&null!=l.data.level&&(a=l.data.level);
e[0]=a;b.log.apply(b,e)})};k.exports=b["default"]},function(k,b,e){b.__esModule=!0;b["default"]=function(b){b.registerHelper("lookup",function(b,e){return b&&b[e]})};k.exports=b["default"]},function(k,b,e){b.__esModule=!0;var m=e(13);b["default"]=function(b){b.registerHelper("with",function(b,a){m.isFunction(b)&&(b=b.call(this));var e=a.fn;if(m.isEmpty(b))return a.inverse(this);var k=a.data;a.data&&a.ids&&(k=m.createFrame(a.data),k.contextPath=m.appendContextPath(a.data.contextPath,a.ids[0]));return e(b,
{data:k,blockParams:m.blockParams([b],[k&&k.contextPath])})})};k.exports=b["default"]},function(k,b,e){b.__esModule=!0;var m=e(13);b["default"]=function(b){b.registerDecorator("inline",function(b,a,e,k){var d=b;a.partials||(a.partials={},d=function(d,c){var h=e.partials;e.partials=m.extend({},h,a.partials);var k=b(d,c);e.partials=h;return k});a.partials[k.args[0]]=k.fn;return d})};k.exports=b["default"]}])});

'use strict';

function renderProcess(processId, params, wapp) {
    importClass("VProcess");
    var process = new VProcess(theRoot);
    var fields = params.fields;
    process.setProcess(processId);

    var CRLF = "\r\n";
    var verb = "HTTP/1.0 200 OK";
    delete(params.body);
    delete(params.fields);
    var keysList = Object.keys(params);
    var i = keysList.length;

    while(i--) {

        if ( keysList[i].toUpperCase().match(/^[A-Z0-9_]*$/) ) {
            if ( params[keysList[i]] instanceof Date ) {
                process.setVar(keysList[i], params[keysList[i]].toISOString().split("T")[0] );
            } else {
                process.setVar(keysList[i].toUpperCase(), params[keysList[i]] );
            }
        }
    }

    process.exec();

    var result = process.varToString("RESULT");
    var ContentType = "Content-Type: text/html; charset=utf-8";
    // If the var result is empty try to render the output
    if (result === "") {
        var pResult = process.result();
        ContentType = "Content-Type: application/json";
        if ((process.objectInfo().outputType() === 2) && (pResult.size() > 0)) {
            result = JSON.stringify(vRegisterListToJSON(pResult, fields));
        } else if (process.objectInfo().outputType() === 1) {
            var list = new VRegisterList(theRoot);
            list.setTable(pResult.tableInfo().idRef());
            list.append(pResult);
            result = JSON.stringify(vRegisterListToJSON(list, fields));
        }
    }

    var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + result.length)];
    headers = headers.concat(BasicHeaders).concat([ContentType]);

    var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + (wapp.isWindows() ? result : unescape(encodeURIComponent(result)));
    return(fullResponse);
}

function renderQuery(queryId, params) {
    importClass("VQuery");
    var query = new VQuery(theRoot);
    var fields = params.fields;
    query.setQuery(queryId);

    var CRLF = "\r\n";
    var verb = "HTTP/1.0 200 OK";

    delete(params.body);
    delete(params.fields);
    var keysList = Object.keys(params);
    var i = keysList.length;

    while(i--) { query.setVar(keysList[i].toUpperCase(),  wApp.getType(params[keysList[i]]));}

    if (query.exec()) {
       var jsonResp = JSON.stringify(vRegisterListToJSON(query.result(), fields));
       var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + jsonResp.length)];
       headers = headers.concat(BasicHeaders).concat(["Content-Type: application/json; charset=utf-8"]);

       var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonResp;
       return(fullResponse);
    }
}

function vRegisterListToJSON(vregisterlist, neededFields) {
    var table   = vregisterlist.tableInfo(),
        nFields = table.fieldCount(),
        i       = vregisterlist.size(),
        result  = [],
        fields  = [],
        type    = 0,
        fieldType;

    // Selecting fields to be mapped
    if (neededFields === undefined) {
        while(nFields--) {
            fieldType = parseInt(table.fieldType(nFields), 10);
            type = (fieldType === 11 ? parseInt("11" + table.fieldObjectType(nFields)) : fieldType);
            fields.push({fieldName: table.fieldId(nFields), fieldType: type});
        }
    } else {
      neededFields = typeof(neededFields) == "string" ? neededFields.toUpperCase().split(",") : neededFields;
      while(nFields--) {
        if ( neededFields.indexOf(table.fieldId(nFields)) > -1 ) {
          fieldType = parseInt(table.fieldType(nFields), 10);
          type = (fieldType === 11 ? parseInt("11" + table.fieldObjectType(nFields)) : fieldType);
          fields.push({fieldName: table.fieldId(nFields), fieldType: type});
        }
       }
    }

    nFields = fields.length;
    while(i--) {
      var record     = vregisterlist.readAt(i),
          z          = nFields,
          recordJSON = {};
      while(z--) {
          recordJSON[fields[z].fieldName] = mapField(fields[z].fieldType, fields[z].fieldName, record);
      }
      result.push(recordJSON);
    }
    return(result);
}

function mapField(type, fieldName, record) {
  var intType = parseInt(type);
  var result;
  switch (intType) {
    case 0:
       result = record.fieldToString(fieldName);
       break;
    case 1:
       result = record.fieldToString(fieldName);
       break;
    case 2:
       result = record.fieldToString(fieldName);
       break;
    case 3:
       result = record.fieldToString(fieldName);
       break;
    case 4:
       result = record.fieldToString(fieldName);
       break;
    case 5:
       result = record.fieldToString(fieldName);
       break;
    case 6:
       result = record.fieldToDouble(fieldName);
       break;
    case 7:
       result = record.fieldToDate(fieldName);
       break;
    case 8:
       result = record.fieldToDateTime(fieldName);
       break;
    case 9:
       result = record.fieldToDateTime(fieldName);
       break;
    case 10:
       result = record.fieldToBool(fieldName);
       break;
    case 11:
       result = "";
       break;
    case 111:
       result = record.fieldToString(fieldName);
       break;
    case 112:
      result = record.fieldToString(fieldName);
      break;
    case 12:
       result = "";
       break;
    case 13:
       result = "";
       break;
    case 14:
       result = "";
       break;
    case 15:
       result = "";
       break;
    case 18:
       result = "";
       break;
    default:
       result = record.fieldToString(fieldName);
       break;
  }
  return(result);
}

const BasicHeaders = [
  "Server: Velneo v7",
  "Access-Control-Allow-Origin: *",
  "Access-Control-Allow-Headers: DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
  "Access-Control-Allow-Methods: GET, POST, PUT, HEAD, OPTIONS, DELETE"
];

//xxxxxxxxxxxxxxxxxxx Main Application Definition xxxxxxxxx
var wApp$1 = {
    version: "1.4",
    isWindows: function () { return (theApp.sysInfo().getOsString().match(/win/i)); },
    config: { filesTable: "cirrusdat/FILES_MEM", root_path: "D://cirrus" },
    router: {
        params: { body: {} },
        parse_params: function (params) {
            var keys = params.length;
            while (keys--) {
                var subarray = params[keys].split("=");
                this.params[subarray[0]] = subarray[1].replace(/\+/g, " ");
            }
        },
        routes: [],
        rexRoutes: [],
        addRoutes: function (rutes) {
            var keys = Object.keys(rutes), i = keys.length;
            while (i--) {
                if (keys[i].split(" ")[0] == "resource") {
                    var rest = this.createREST(keys[i].split(" ")[1]);
                    this.addRoutes(rest);
                }
                else {
                    var basic = {}, key = keys[i];
                    basic[key] = rutes[key];
                    var myRegex = new RegExp(key.replace(/:\w+/g, "([\\w@\.]+)") + "\/?$", "i");
                    this.rexRoutes.unshift(myRegex);
                    this.routes.unshift(basic);
                }
            }
        },
        createREST: function (resource) {
            var rest = {};
            rest["GET /" + resource] = resource + "Controller#index";
            rest["GET /" + resource + "/new"] = resource + "Controller#new";
            rest["POST /" + resource] = resource + "Controller#create";
            rest["GET /" + resource + "/:id"] = resource + "Controller#show";
            rest["GET /" + resource + "/:id/edit"] = resource + "Controller#edit";
            rest["PUT /" + resource + "/:id"] = resource + "Controller#update";
            rest["DELETE /" + resource + "/:id"] = resource + "Controller#delete";
            return (rest);
        },
        pointRequest: function (url) {
            var z = this.rexRoutes.length;
            for (i = 0; i < z; i++) {
                var rutaRegExp = this.rexRoutes[i], match = url.match(rutaRegExp);
                if (match) {
                    var x = this.routes[i]; // Keys from the match object
                    var custom_route = Object.keys(x)[0];
                    // extract URL params and Add it to global params
                    var requestParams = custom_route.match(/:(\w+)/g);
                    if (requestParams) {
                        var requestVars = url.match(rutaRegExp);
                        requestVars.shift();
                        z = requestParams.length;
                        while (z--) {
                            var param = requestParams[z];
                            this.params[param.replace(":", "")] = decodeURIComponent(requestVars[requestParams.indexOf(param)]);
                        }
                    }
                    // if match returns "controller#method"
                    return (x[custom_route]);
                }
            }
            return ("NOT FOUND");
        }
    },
    session: {
        cookie_name: "v7App",
        cookie: { session: {} },
        session: {},
        flash: {},
        flashGet: {},
        flashSet: {},
        setFlash: function (key, value) {
            this.changed = true;
            this.flashSet[key] = value;
            return (true);
        },
        getFlash: function (key) {
            return (this.flashGet[key]);
        },
        changed: false,
        set: function (key, value) {
            this.changed = true;
            this.session[key] = value;
            return (true);
        },
        get: function (key) {
            return (this.session[key]);
        },
        setInHeader: function () {
            var expires;
            var path;
            var encoded = "";
            if (Object.keys(this.flashSet).length > 0) {
                this.session.flash = this.flashSet;
                this.flashSet = {};
            }
            if (Object.keys(this.session).length !== 0) {
                expires = this.session.expires;
                path = this.session.path;
                delete (this.session.expires);
                delete (this.session.path);
                encoded = Base64.encode(encodeURIComponent(JSON.stringify(this.session)));
            }
            var cookie = this.cookie_name + "=" + encoded;
            if (expires !== undefined) {
                cookie += ("; " + "expires=" + expires.toGMTString());
            }
            if (path !== undefined) {
                cookie += ("; " + "path=" + path);
            }
            return ("set-Cookie: " + cookie);
        },
        getFromHeader: function (cookie) {
            var regexp = new RegExp(wApp$1.session.cookie_name + "=(\\w+)\\;?");
            var myCookie = {}, cookie_name = wApp$1.cookie_name;
            var matched_cookie = cookie.match(regexp);
            if (matched_cookie) {
                myCookie[cookie_name] = matched_cookie[1];
                a = Base64.decode(myCookie[cookie_name]);
                b = decodeURIComponent(a);
                myCookie.session = JSON.parse(b.replace(/\0/g, ''));
                this.cookie = myCookie; // raw cookie + session
                this.session = myCookie.session;
                if (this.session.flash !== undefined) {
                    this.flashGet = this.session.flash;
                    delete (this.session.flash);
                    this.changed = true;
                }
            }
            return (myCookie[cookie_name]);
        }
    },
    params: function () { return (this.router.params); },
    responseHeaders: {
        headers: {},
        set: function (name, value) { this.headers[name] = value; },
        buildForHTTP: function () {
            var keys = Object.keys(this.headers), i = keys.length, result = [];
            for (z = 0; z < i; z++) {
                result.push(keys[z] + ": " + this.headers[keys[z]]);
            }
            return result;
        }
    },
    request: Request,
    response: Response,
    logError: logError,
    getHTML: getHTML,
    vRegisterListToJSON: vRegisterListToJSON,
    renderProcess: renderProcess,
    renderQuery: renderQuery,
    mapField: mapField,
    getType: getType
};
// xxxxxxxxxxxxxxxxxxxxxxxxx HTTP Parser xxxxxxxxxxxxxx
function http_parser(http_request, type) {
    var split_request = http_request.split("\r\n\r\n"); //split header from body
    var request = split_request[0].match(/^(GET|POST|PUT|DELETE|UPDATE|OPTIONS) (.+) (.+)[\r\n]?/), headers = split_request[0].replace(/^(GET|POST|PUT|DELETE|UPDATE|OPTIONS) (.+) (.+)[\r\n]?/, ""), header_regx = /(.+): (.+)/g, body_params_regx = /([^&]+)=([^&]+)/g, url_and_params = request[2].split("?"), extension = url_and_params[0].match(/\.(\w+)$/i), req = {
        verb: request[1],
        path: request[2],
        protocol: request[3],
        url: url_and_params[0],
        extension: (extension ? extension[1].toLowerCase() : undefined),
        encodeParams: url_and_params[1],
        decodeParams: {},
        headers: {},
        body: {},
        bodyDecoded: {},
        cookie: ""
    };
    // Setting Headers
    // Delete "-" in header's names
    while (header = header_regx.exec(headers)) {
        req.headers[header[1]] = header[2];
    }
    // Get the Query String
    var params = req.encodeParams;
    if (req.encodeParams) {
        var value, key, current;
        while (param = body_params_regx.exec(params)) {
            key = decodeURIComponent(param[1]).replace("[]", "");
            value = wApp$1.getType(decodeURIComponent(param[2]).replace(/\+/g, " "));
            current = req.decodeParams[key];
            if (current === undefined) {
                req.decodeParams[key] = decodeURIComponent(param[1]).match(/^.*\[\]$/) ? [value] : value;
            }
            else {
                if (typeof (current) !== "object") {
                    req.decodeParams[key] = [current];
                }
                req.decodeParams[key].push(value);
            }
        }
    }
    // Body params if any
    if (split_request.length == 2) {
        params = req.body = split_request[1].trim().replace(/\+/g, " ");
        while (body = body_params_regx.exec(params)) {
            // check for method en params
            if (body[1] == "_method" && decodeURIComponent(body[2]).match(/^(PUT|DELETE)$/i)) {
                req.verb = decodeURIComponent(body[2]).toUpperCase();
            }
            else {
                var decKey = decodeURIComponent(body[1]).replace("[]", ""), actual = req.bodyDecoded[decKey], newVal = wApp$1.getType(decodeURIComponent(body[2]));
                if (actual === undefined) {
                    req.bodyDecoded[decKey] = newVal;
                }
                else {
                    if (typeof (actual) != "object") {
                        req.bodyDecoded[decKey] = [actual];
                    }
                    req.bodyDecoded[decKey].push(newVal);
                }
            }
        }
    }
    return (req);
}
// xxxxxxxxxxxxxxxxxxxxxxxxx Request Object xxxxxxxxxxxxxx
function Request(http_request) {
    try {
        var req = http_parser(http_request);
        wApp$1.router.params = req.decodeParams;
        if (req.bodyDecoded !== undefined) {
            wApp$1.router.params.body = req.bodyDecoded;
        }
        // body json
        if (req.headers["Content-Type"] !== undefined && req.headers["Content-Type"].match(/application\/json/i) && req.body) {
            wApp$1.router.params.body = JSON.parse(req.body);
        }
        // body XML
        else if (req.headers["Content-Type"] !== undefined && req.headers["Content-Type"].match(/text\/xml/i) && req.body) {
            wApp$1.router.params.body = req.body;
        }
        else {
            wApp$1.router.params.body = req.bodyDecoded;
        }
        // Set Cookie
        if (req.headers.Cookie !== undefined) {
            wApp$1.session.getFromHeader(req.headers.Cookie);
        }
        return (req);
    }
    catch (e) {
        return (e);
    } // Capturamos el error de parseo del JSON
}
function getType(str) {
    var isInteger = /^[1-9]\d*$/i, isCommaFloat = /^\d*,\d*$/i, isPointFloat = /^\d*\.\d*$/i, isCurrencyComma = /^\d{1,3}(\.\d{3})*(\,\d*)?$/g, isCurrencyPoint = /^\d{1,3}(\,\d{3})*(\.\d*)?$/g, isBool = /(true|false)/, 
    // 10/12/2012, 1/5/12
    isPureDatedmy = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/, 
    // 2012/12/10, 2012-12-10
    isPureDateymd = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/, 
    /* DateTime */
    // Local String => "5/25/2014 9:05:34 PM"
    isDateTime = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4} \d{1,2}:\d{1,2}:\d{1,2} \w\w$/, 
    // UTC => "Mon, 26 May 2014 02:05:34 GMT"
    isDateTimeUTC = /^\w*, \d* \w* \d{2,4} \d{1,2}:\d{1,2}:\d{1,2} \w\w\w$/, 
    // ISO string => "2014-05-26T02:25:07.850Z"
    isDateTimeISO = /^\d{2,4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}\.\d*Z$/, params1, params2, params, date, year, month, day, minute, second;
    if (str.match(isInteger) && str.length < 14) {
        return (parseInt(str, 10));
    }
    if (str.match(isCurrencyComma)) {
        return (parseFloat(str.replace(/\./g, "").replace(",", ".")));
    }
    if (str.match(isCurrencyPoint)) {
        return (parseFloat(str.replace(/\,/g, "")));
    }
    if (str.match(isCommaFloat)) {
        return (parseFloat(str.replace(",", ".")));
    }
    if (str.match(isPointFloat)) {
        return (parseFloat(str));
    }
    if (str.match(isBool)) {
        return (str == "true" ? true : false);
    }
    if (str.match(isPureDatedmy)) {
        params1 = str.split("/");
        params2 = str.split("-");
        params = params1.length > 1 ? params1 : params2;
        date = new Date(parseInt(params[2], 10), (parseInt(params[1], 10) - 1), parseInt(params[0], 10));
        return (date);
    }
    if (str.match(isPureDateymd)) {
        params1 = str.split("/");
        params2 = str.split("-");
        params = params1.length > 1 ? params1 : params2;
        date = new Date(parseInt(params[0], 10), (parseInt(params[1], 10) - 1), parseInt(params[2], 10));
        return (date);
    }
    if (str.match(isDateTime)) {
        params = str.split(" ");
        var dayParts = params[0].split("/");
        var hourParts = params[1].split(":");
        var hora = params[2].match(/am/i) ? parseInt(hourParts[0]) : (parseInt(hourParts[0]) + 12);
        date = new Date(parseInt(dayParts[2], 10), (parseInt(dayParts[0], 10) - 1), parseInt(dayParts[1], 10), hora, parseInt(hourParts[1], 10), parseInt(hourParts[2], 10));
        return (date);
    }
    if (str.match(isDateTimeUTC)) {
        var months = { "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12 };
        params = str.split(",")[1].split(" ");
        day = parseInt(params[0], 10);
        month = months[params[1]];
        year = parseInt(params[2], 10);
        hour = parseInt(parmas[3].split(":")[0], 10);
        minute = parseInt(parmas[3].split(":")[1], 10);
        second = parseInt(parmas[3].split(":")[2], 10);
        date = new Date(year, month, day, hour, minute, second);
        return (date);
    }
    if (str.match(isDateTimeISO)) {
        params = str.split("T");
        params1 = params[0];
        params2 = params[1].split(".")[0];
        year = parseInt(params1.split("-")[0], 10);
        month = parseInt(params1.split("-")[1], 10) - 1;
        day = parseInt(params1.split("-")[2], 10);
        hour = parseInt(params2.split(":")[0], 10);
        minute = parseInt(params2.split(":")[1], 10);
        second = parseInt(params2.split(":")[2], 10);
        date = new Date(year, month, day, hour, minute, second);
        return (date);
    }
    return (str);
}
function Response(request) {
    try {
        // Comprobamos que si se ha producido un error en el parseo de la petición
        if (request.name == "SyntaxError")
            throw request;
        var types = {
            "js": "application/javascript",
            "css": "text/css",
            "woff": "application/font-woff",
            "ttf": "application/font-sfnt",
            "svg": "image/svg+xml",
            "eot": "application/vnd.ms-fontobject",
        };
        if (types[request.extension] !== undefined) {
            // Assetss request handling
            var record = getHTML(request.url);
            if (record.html !== "") {
                return (renderResponseAssets(record, types[request.extension], wApp$1));
            }
            else {
                return ("HTTP/1.0 404 NOT FOUND");
            }
        }
        else if (request.extension === "pro") {
            // process maping handling
            var process = wApp$1.router.pointRequest(request.verb + " " + request.url);
            return (process != "NOT FOUND" ? renderProcess(process, wApp$1.router.params, wApp$1) : "HTTP/1.0 404 NOT FOUND");
        }
        else if (request.extension === "bus") {
            // query maping handling
            var query = wApp$1.router.pointRequest(request.verb + " " + request.url);
            return (query != "NOT FOUND" ? renderQuery(query, wApp$1.router.params) : "HTTP/1.0 404 NOT FOUND");
        }
        else if (request.verb === "OPTIONS") {
            // CORS request
            var CRLF = "\r\n";
            var headers = ["Access-Control-Allow-Origin: *",
                "Access-Control-Allow-Headers: DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
                "Access-Control-Allow-Methods: GET, POST, PUT, HEAD, OPTIONS, DELETE"];
            return ("HTTP/1.0 204 OK" + CRLF + headers.join(CRLF) + CRLF + CRLF);
        }
        else {
            // HTML or JSON request
            var actions = wApp$1.router.pointRequest(request.verb + " " + request.url.split(".")[0]);
            if (actions != "NOT FOUND") {
                var controllerAction = actions.split("#");
                return (renderResponse(controllerAction[0], controllerAction[1], wApp$1, request));
            }
            else {
                var orphanHTML = getHTML("/views" + request.url);
                if (orphanHTML.html !== "") {
                    var layoutHTML = getHTML("/layouts/application"), layoutBody = (layoutHTML.html === "" ? "#yield" : layoutHTML.html), full_body = layoutBody.replace("#yield", orphanHTML.html);
                    return (renderResponseAssets({ html: full_body }, "text/html; charset=utf-8", wApp$1));
                }
                else {
                    return ("HTTP/1.0 404 NOT FOUND");
                }
            }
        }
    }
    catch (e) {
        // Sending Internal Message Error with info
        switch (e.name) {
            case "SyntaxError":
                return renderErrorResponse(e, "Unable to parse JSON string");
            default:
                var errorDesc = logError(e);
                return (renderErrorResponse(e, errorDesc));
        }
    }
}
function renderResponseAssets(record, type, wapp) {
    var CRLF = "\r\n", verb = "HTTP/1.0 200 OK", string = unescape(encodeURIComponent(record.html)), // Encode to UFT-8
    headers = [("Date: " + (new Date()).toGMTString()), ("Content-Length: " + string.length)];
    if (record.useCache) {
        headers.push("Cache-Control: max-age=" + record.maxAge);
        headers.push("ETag: " + record.eTag);
    }
    headers = headers.concat(BasicHeaders).concat([("Content-Type: " + type)]);
    var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + string;
    return (fullResponse);
}
function renderUnauthorized(realm) {
    var CRLF = "\r\n", jsonresp = unescape(encodeURIComponent(JSON.stringify({ message: "Unauthorized" }))), headers = BasicHeaders.concat(["WWW-Authenticate: Basic realm=\"" + (realm || "cirrus") + "\""]);
    var resp = "HTTP/1.0 401 Unauthorized" + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonresp;
    return (resp);
}
function isAuthorized(controller, request) {
    var userAndPassword = Base64.decode(request.headers.Authorization.split(" ")[1]).split(":");
    return (controller.authentication.username == userAndPassword[0] && controller.authentication.password == userAndPassword[1]);
}
function renderResponse(controller, action, wapp, request) {
    var CRLF = "\r\n", type = (request.extension || request.headers.Accept), needsAuthentication = wapp[controller].authentication !== undefined && typeof (wapp[controller].authentication) == "object" && wapp[controller].authentication.username !== "" && wapp[controller].authentication.password !== "", actionRequired = ((wapp[controller].authentication || {}).actions || []).indexOf(action) > -1 || (wapp[controller].authentication || {}).all;
    if (needsAuthentication && actionRequired) {
        if (request.headers.Authorization === undefined || isAuthorized(wapp[controller], request) === false) {
            return (renderUnauthorized(wapp[controller].authentication.namespace));
        }
    }
    if (wapp[controller].before !== undefined && typeof (wapp[controller].before) == "function") {
        wapp.router.params = wapp[controller].before(wapp.router.params);
    }
    var redirect_before = wapp.router.params.redirect_to !== undefined, jsonresp = redirect_before ? wapp.router.params : wapp[controller][action](wapp.router.params, request);
    type = type || "json";
    if (jsonresp.redirect_to) {
        type = "redirect";
    } //Check for redirection
    var format = type.match(/(html|xml|json|redirect)/i) || ["json"];
    var rendered = Engine[format[0]](jsonresp, wapp, controller, action);
    var headers = [("Date: " + (new Date()).toGMTString()), ("Content-Length: " + (rendered.body ? rendered.body.length : "0"))];
    headers = headers.concat(BasicHeaders).concat(rendered.headers).concat(wapp.responseHeaders.buildForHTTP());
    if (wApp$1.session.changed) {
        headers.push(wApp$1.session.setInHeader());
    }
    var fullResponse = rendered.verb + CRLF + headers.join(CRLF) + CRLF + CRLF + rendered.body;
    return (fullResponse);
}
var Engine = {
    json: function (jsonresp, wapp) {
        var verb = jsonresp.responseCode !== undefined && jsonresp.responseCode.code !== undefined && jsonresp.responseCode.message !== undefined ? ("HTTP/1.0 " + jsonresp.responseCode.code + " " + jsonresp.responseCode.message) : "HTTP/1.0 200 OK";
        delete (jsonresp.responseCode);
        var jsonp = wapp.router.params.callback;
        jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp);
        jsonresp = unescape(encodeURIComponent(jsonresp)); // Encode to UFT-8
        var headers = [("Content-Type: application/" + (jsonp ? "javascript" : "json") + "; charset=utf-8")];
        return ({ verb: verb, body: jsonresp, headers: headers });
    },
    html: function (jsonresp, wapp, controller, action) {
        var verb = "HTTP/1.0 200 OK", layout_body, full_body;
        if (typeof (jsonresp) == "object") {
            var layout = jsonresp.layout || "application", file = "/views/" + controller.replace("Controller", "") + "/" + action, template;
            jsonresp.controller = controller;
            jsonresp.action = action;
            jsonresp.session = wApp$1.session.session;
            jsonresp.flash = wApp$1.session.flashGet;
            if (jsonresp.layout !== false) {
                var layoutHTML = getHTML("/layouts/" + layout);
                if (layoutHTML.type === "template") {
                    layout_temp = Handlebars.compile(layoutHTML.html);
                }
                layout_body = layoutHTML.type === "template" ? layout_temp(jsonresp) : layoutHTML.html;
            }
            else {
                // Render without a layout
                layout_body = "#yield";
            }
            var pureHTML = getHTML(file);
            if (pureHTML.type === "template") {
                template = Handlebars.compile(pureHTML.html);
            }
            if (pureHTML.html === "") {
                pureHTML.html = "<div><h1>There is not view for this action</h1></div>";
            }
            var body = pureHTML.type === "template" ? template(jsonresp) : pureHTML.html;
            full_body = layout_body.replace("#yield", body);
        }
        else {
            full_body = jsonresp;
        }
        var headers = ["Content-Type: text/html; charset=utf-8"];
        return ({ verb: verb, body: (wapp.isWindows() ? full_body : unescape(encodeURIComponent(full_body))), headers: headers });
    },
    xml: function (jsonresp, wapp) {
        var verb = "HTTP/1.0 200 OK", headers = ["Content-Type: text/xml; charset=UTF-8"], xmlResp;
        if (jsonresp.xml) {
            xmlResp = (wapp.isWindows() ? jsonresp.xml : unescape(encodeURIComponent(jsonresp.xml)));
        }
        else {
            xmlResp = "<?xml version='1.0' encoding='UTF-8'?><error version='1.0'>The JSON object should have an xml key</error>";
        }
        return ({ verb: verb, body: xmlResp, headers: headers });
    },
    redirect: function (jsonresp) {
        var verb = "HTTP/1.0 302 Found";
        var headers = ["location: " + jsonresp.redirect_to];
        return ({ verb: verb, body: "", headers: headers });
    }
};
function getHTML(path) {
    importClass("VTextFile");
    importClass("VFile");
    var extension = path.split(".")[path.split(".").length - 1].match(/(css|js|html|woff|ttf|svg|eot)/i) === null ? ".html" : "";
    path += extension;
    var file = new VTextFile(wApp$1.config.root_path + path), file_hbs = new VTextFile(wApp$1.config.root_path + path + ".hbs"), type = file_hbs.exists() ? "template" : "html";
    if (file.exists()) {
        if (file.open(VFile.OpenModeReadOnly)) {
            html = file.readAll();
        }
        else {
            html = "";
        }
    }
    else if (file_hbs.exists()) {
        if (file_hbs.open(VFile.OpenModeReadOnly)) {
            html = file_hbs.readAll();
        }
        else {
            html = "";
        }
    }
    else {
        html = "";
    }
    return ({ html: html, type: type });
}
function logError(e) { return (e.lineNumber === undefined) ? e.message : (e.message + ". In Line Number: " + e.lineNumber); }
function renderErrorResponse(e, errorDesc) {
    var CRLF = "\r\n";
    var jsonp = wApp$1.router.params.callback;
    var jsonresp = { message: errorDesc };
    jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp);
    jsonresp = unescape(encodeURIComponent(jsonresp)); // Encode to UFT-8
    var resp = "HTTP/1.0 500 INTERNAL SERVER ERROR" + CRLF + BasicHeaders.join(CRLF) + CRLF + CRLF + jsonresp;
    return (resp);
}
module.exports = wApp$1;
