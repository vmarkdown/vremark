var visit = require('unist-util-visit');
const parseAttr = require('./attr-parser');

function plugin(options = {}) {

    return function transformer(root) {

        root.plugins = root.plugins || [];

        visit(root, 'heading', function (node) {

            var children = node.children;

            var last = children.slice(-1);

            if(!last || last.length === 0) {
                return;
            }

            last = last[0];

            if(!last.value) {
                return;
            }

            var text = last.value;


            if(!/{[\s\S]*}/.test(text)) {
                return;
            }

            var index = text.indexOf('{');

            if( children.length === 1 && text.length > 1 && text[index-1] !== ' ' ) {
                return;
            }

            var attrs = parseAttr(text, index).prop;

            node.data = node.data || {};
            node.data.attrs = node.data.attrs || {};

            if(attrs.class) {
                node.data.class = [].concat(node.data.class).concat(attrs.class);
                delete attrs.class;
            }

            Object.assign(node.data.attrs, attrs || {});

            last.value = text.substring(0, index);
        });

    };

}

module.exports = plugin;