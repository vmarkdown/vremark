const PLUGIN_NAME = 'vremark-plugin-g2';

function isPlugin(node) {
    return node.lang && node.lang === 'g2';
}

function plugin(options = {}) {

    return async function transformer(root) {

        root.plugins = root.plugins || {};

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

                node.tagName = PLUGIN_NAME;
                root.plugins[PLUGIN_NAME] = true;

            }
        }

    };

}

module.exports = plugin;