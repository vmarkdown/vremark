const PLUGIN_NAME = 'vremark-plugin-sequence';

function isPlugin(node) {
    return node.lang && (node.lang === 'seq' || node.lang === 'sequence' )
}

function plugin(options = {}) {

    var enable = options.enable;

    return async function transformer(root) {

        root.plugins = root.plugins || [];

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){

                if(!enable) {
                    root.plugins.push(PLUGIN_NAME);
                    break;
                }

                node.data = node.data || {};
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });

                node.tagName = PLUGIN_NAME;
                // root.plugins[PLUGIN_NAME] = true;
            }
        }

    };

}

plugin.PLUGIN_NAME = PLUGIN_NAME;

module.exports = plugin;
