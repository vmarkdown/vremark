const toVDom = require('vremark-parse/packages/hast-util-to-vdom');

module.exports = function render(hast, options) {
    return toVDom(hast, options);
};
