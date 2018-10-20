var visit = require('unist-util-visit');

const G2 = require('@antv/g2');
G2.track(false);

var G2Component = require('./g2-component');


function hash(str) {
    var hash = 5381, i = str.length;
    while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        visit(root, function (node) {

            if(node.type === 'element' && node.tagName === "pre" && node.children.length > 0){

                var item = node.children[0];

                if(item.type === 'element' && item.tagName === "code"){

                    if(item.properties.className && item.properties.className.indexOf("language-G2.Chart") >-1 ) {
                        return true;
                    }

                }

            }

            return false;

        }, function (node) {

            var options = {};

            try {
                var code = node.children[0];
                var type = code.properties.className[0].replace('language-G2.', '');
                options.type = type;
                var item = code.children[0];
                node.key = hash(item.value);
                var func = new Function('return '+item.value);
                var _options = func();
                Object.assign(options, _options);
            }
            catch (e) {
                options = {};
            }


            // node.key = new Date().getTime();
            node.children = [];
            node.type = 'component';
            // node.type = 'raw';
            node.component = G2Component;
            node.properties = Object.assign({}, node.properties, options );

        });

    };

};