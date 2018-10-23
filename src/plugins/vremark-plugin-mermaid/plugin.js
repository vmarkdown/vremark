const PLUGIN_NAME = 'vremark-plugin-mermaid';
const COMPONENT_NAME = 'vremark-component-mermaid';

function isPlugin(node) {
    return node.lang && node.lang === 'mermaid';
}

function plugin(options = {}) {

    return async function transformer(root) {

        // root.components = root.components || {};

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });
                // node.component = PLUGIN_NAME;
                // node.type = 'component';
                node.tagName = COMPONENT_NAME;
                // root.components[PLUGIN_NAME] = true;

            }
        }

    };

}

plugin.COMPONENT_NAME = COMPONENT_NAME;

module.exports = plugin;