var visit = require('unist-util-visit');

module.exports = function plugin(options = {}) {
    return function transformer(root) {

        visit(root, 'image', function (node) {

            var url = node.url;

            if(!/@[w|h|a]=[\d|left|right|center]+/.test(url)) {
                return;
            }

            var sizeIndex = url.match(/@[w|h|a]=/);
            if(sizeIndex){
                node.url = url.substring(0, sizeIndex['index']);
            }

            var align = '';
            var size = {};

            var result = url.match(/@?[w|h|a]=[\d|left|right|center]+/g);
            result && result.forEach(function (r) {
                r = r.replace('@', '');
                var rs = r.split('=');

                if(rs[0] === 'w') {
                    size.width = parseFloat(rs[1])
                }
                else if(r[0] === 'h') {
                    size.height = parseFloat(rs[1])
                }
                else if(r[0] === 'a') {
                    // size.align = rs[1]
                    align = rs[1]
                }
            });


            node.data = node.data || {};
            node.data.attrs = node.data.attrs || {};
            node.data.style = node.data.style || {};

            Object.assign(node.data.attrs, size);

            if(align) {
                node.align = align;
            }

        });


    };
};