'use strict';

// require('highlight.js/styles/default.css');
require('highlight.js/styles/github.css');

var visit = require('unist-util-visit');
var hljs = require('highlight.js');
var Component = require('./highlight-component');

module.exports = function checkbox(options = {}) {

    return function transformer(root) {

        return visit(root, 'code', function (node) {

            var lang = node.lang;

            if (!lang || !hljs.getLanguage(lang)) {
                return;
            }

            node.data = node.data || {};
            node.data.props = node.data.props || {};

            node.data.props.lang = lang;
            node.data.props.code = node.value;

            node.data.component = Component;
            node.type = 'component';

        });

    };

};

