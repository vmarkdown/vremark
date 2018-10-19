'use strict';

var visit = require('unist-util-visit');
var languages = (function () {
    var languages = require('./languages');
    var keys = {};
    languages.forEach(function (language) {
        keys[language] = true;
    });
    return keys;
})();

module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        return visit(root, 'code', function (node) {

            var lang = node.lang;

            if (!lang || !languages[lang]) {
                return;
            }

            node.data = node.data || {};
            node.data.props = node.data.props || {};
            Object.assign(node.data.props, {
                lang: lang,
                code: node.value
            });

            node.type = 'highlight';

        });

    };

};

