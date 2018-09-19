'use strict';

// var hljs = require('highlight.js')
var line = require('./highlightjs-line-numbers');
const visit = require('unist-util-visit');

module.exports = function checkbox(options = {}) {

    var hljs = options.hljs || this.data('hljs') || window['hljs'];

    var lineNumbers = options.lineNumbers;

    return function transformer(root) {

        return visit(root, 'code', function (node) {

            var lang = node.lang;

            if (!lang || !hljs.getLanguage(lang)) {
                return;
            }

            var h = hljs.highlight(lang, node.value);
            var html = lineNumbers?line.addLineNumbersBlockFor(h.value, 1):h.value;
            var wrap = '<pre class="highlight-code highlight-code-line-numbers"><code class="hljs hljs-dark '+h.language+'">'+ html +'</code></pre>';
            node.value = wrap;
            node.type = 'html';

        });

    };

};

