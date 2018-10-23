const toVDom = require('../lib/hast-util-to-vdom');

function render(hast, options) {
    return toVDom(hast, options);
}

module.exports = render;

