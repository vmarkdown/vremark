const PLUGIN_NAME = 'vremark-plugin-highlight';

var languages = (function () {
    var languages = require('./languages');
    var keys = {};
    languages.forEach(function (language) {
        keys[language] = true;
    });
    return keys;
})();

function isPlugin(node) {
    return node.lang && languages[node.lang];
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