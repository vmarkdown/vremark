const PLUGIN_NAME = 'vremark-plugin-math';
const COMPONENT_NAME = 'vremark-math';

var visit = require('unist-util-visit');
function isPlugin(node) {
    return (node.type === 'math' || node.type === 'inlineMath' )
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};
        // root.components = root.components || {};

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
            node.tagName = COMPONENT_NAME;

            // root.components[PLUGIN_NAME] = true;

            root.plugins[PLUGIN_NAME] = {
                component: COMPONENT_NAME
            };

        });

    };

}

plugin.COMPONENT_NAME = COMPONENT_NAME;

module.exports = plugin;