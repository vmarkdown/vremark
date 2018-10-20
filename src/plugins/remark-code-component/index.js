var visit = require('unist-util-visit');

function hash(str) {
    var hash = 5381, i = str.length;
    while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

var languages = require('./languages');
var languageKeys = {};
languages.forEach(function (language) {
    languageKeys[language] = true;
});

function hasLanguage(name) {
    return languageKeys[name];
}

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        var children = root.children;

        for(var i=0;i<children.length;i++) {
            var node = children[i];

            if(node.type !== 'code'){
                continue;
            }

            if(!node.lang || !hasLanguage(node.lang)) {
                continue;
            }

            node.data = node.data || {};
            node.data.key = hash(node.value);
            node.data.props = node.data.props || {};
            Object.assign(node.data.props, {
                lang: node.lang,
                code: node.value
            });

            node.type = 'component';

        }

    };

};