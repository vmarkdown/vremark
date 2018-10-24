const PLUGIN_NAME = 'vremark-plugin-math';

var visit = require('unist-util-visit');
function isPlugin(node) {
    return (node.type === 'math' || node.type === 'inlineMath' )
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

        visit(root, function (node) {
            return isPlugin(node);
        }, function (node) {

            node.data = node.data || {};

            node.data.props = node.data.props || {};
            Object.assign(node.data.props, {
                inline: (node.type === "inlineMath"),
                code: node.value
            });

            node.type = 'code';
            node.tagName = PLUGIN_NAME;

            root.plugins[PLUGIN_NAME] = true;

        });

    };

}

module.exports = plugin;