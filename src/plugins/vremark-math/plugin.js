const PLUGIN_NAME = 'vremark-math';

var visit = require('unist-util-visit');
function isPlugin(node) {
    return (node.type === 'math' || node.type === 'inlineMath' )
}

module.exports = function plugin(options = {}) {

    return async function transformer(root) {

        root.components = root.components || {};

        visit(root, function (node) {
            return isPlugin(node);
        }, function (node) {

            node.data = node.data || {};

            node.data.props = node.data.props || {};
            Object.assign(node.data.props, {
                inline: (node.type === "inlineMath"),
                code: node.value
            });
            // node.component = PLUGIN_NAME;
            // node.type = 'component';
            node.type = 'code';
            node.tagName = PLUGIN_NAME;
            root.components[PLUGIN_NAME] = true;

        });

    };

};