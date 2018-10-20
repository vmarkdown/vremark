var visit = require('unist-util-visit');

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        visit(root, {
            type: 'code',
            lang: "flow"
        }, function (node) {

            node.data = node.data || {};
            node.data.props = node.data.props || {};
            Object.assign(node.data.props, {
                lang: 'flow',
                code: node.value
            });

            node.type = 'flowchart';

        });

    };

};