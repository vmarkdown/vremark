const toVDom = require('../lib/hast-util-to-vdom');

const PluginManager = require('./plugin-manager');

function render(hast, options) {
    return toVDom(hast, options);
}

render.PluginManager = PluginManager;

module.exports = render;

