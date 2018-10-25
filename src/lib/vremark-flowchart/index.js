const PLUGIN_NAME = 'vremark-plugin-flowchart';

function isPlugin(node) {
    return node.lang && (node.lang === 'flow' || node.lang === 'flowchart' )
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