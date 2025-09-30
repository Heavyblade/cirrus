// Node-friendly entry point that wires the faux Velneo runtime before loading Cirrus.
require('../vjavascript.js');

const Base64 = require('../base64.js');
const renderUtils = require('../v7_render.js');

if (typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis;
}

require('../handlebars.js');
const Handlebars = global.Handlebars;

// Expose globals consumed by the core library when running in Node/Jasmine.
global.Base64 = Base64;
global.Handlebars = Handlebars;

global.renderProcess = renderUtils.renderProcess;
global.renderQuery = renderUtils.renderQuery;
global.vRegisterListToJSON = renderUtils.vRegisterListToJSON;
global.mapField = renderUtils.mapField;

module.exports = require('../cirrus.js');
