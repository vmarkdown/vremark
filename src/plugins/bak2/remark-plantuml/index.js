var visit = require('unist-util-visit');
var plantumlEncoder = require('plantuml-encoder');

var FORAMT = {
    SVG: {
        type:'svg',
        element(url) {
            return '<embed src="' + url + '">';
        }
    },
    IMAGE: {
        type:'img',
        element(url) {
            return '<img src="'+url+'">';
        }
    }
};

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        visit(root, {
            type: 'code',
            lang: "plantuml"
        }, function (node) {

            var encoded = plantumlEncoder.encode(node.value);
            var url = 'http://www.plantuml.com/plantuml/'+FORAMT.SVG.type+'/' + encoded;

            node.properties = node.properties?node.properties:{};
            node.properties.className = 'remark-plantuml';
            node.properties.innerHTML = FORAMT.SVG.element(url);

        });

    };

};