var visit = require('unist-util-visit');
var CONTAINER_TMEP_CREATE_ID = 'vremark-g2-temp-create-container';

var G2Component = require('./g2-component');

G2.track(false);

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
                var func = new Function('return '+item.value);
                var _options = func();
                Object.assign(options, _options);
            }
            catch (e) {
                options = {};
            }


            node.children = [];
            node.type = 'component';
            // node.type = 'raw';
            node.component = G2Component;
            node.properties = options;

        });

    };

};