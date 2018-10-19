'use strict';

// require('highlight.js/styles/default.css');
// require('highlight.js/styles/github.css');

var visit = require('unist-util-visit');
// var hljs = require('highlight.js');
// var Component = require('./highlight-component');
// var languages = require('./languages');
// var keys = {};
// languages.forEach(function (language) {
//     keys[language] = true;
// });

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

            // debugger
            // if (!lang || !hljs.getLanguage(lang)) {
            //     return;
            // }
            if (!lang || !languages[lang]) {
                return;
            }

            // node.properties = node.properties || {};

            // Object.assign(node.properties, {
            //     lang: lang,
            //     code: node.value
            // });

            node.data = node.data || {};
            node.data.props = node.data.props || {};
            Object.assign(node.data.props, {
                lang: lang,
                code: node.value
            });

            // node.data.props = node.data.props || {};

            // node.data.props.lang = lang;
            // node.data.props.code = node.value;

            // node.data.component = Component;
            // node.type = 'component';

            node.type = 'highlight';

        });

    };

};

