'use strict'

var normalize = require('mdurl/encode')
var all = require('../all')

module.exports = link

/* Transform a link. */
function link(h, node) {
    var href = normalize(node.url);
    var isEmailAddress = href && href.startsWith('mailto:');
    var props = {href: href};

    if (node.target) {
        props.target = node.target;
    }
    else if (isEmailAddress) {

    }
    else {
        props.target = '_blank';
    }

    if (node.title !== null && node.title !== undefined) {
        props.title = node.title;
    }

    return h(node, 'a', props, all(h, node))
}
