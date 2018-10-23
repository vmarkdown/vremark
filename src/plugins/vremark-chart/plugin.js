const PLUGIN_NAME = 'vremark-chart';

function isPlugin(node) {
    return node.lang && node.lang === 'chart';
}

module.exports = function plugin(options = {}) {

    return async function transformer(root) {

        root.components = root.components || {};

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
                node.component = PLUGIN_NAME;
                node.type = 'component';

                root.components[PLUGIN_NAME] = true;

            }
        }


    };

};