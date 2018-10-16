var visit = require('unist-util-visit');
var mermaid = require('mermaid');

mermaid.initialize({ startOnLoad: false });

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        visit(root, {
            type: 'code',
            lang: "mermaid"
        }, function (node) {

            var innerHTML = mermaid.render('mermaid', node.value);
            node.properties = node.properties?node.properties:{};
            node.properties.className = 'remark-mermaid';
            node.properties.innerHTML = innerHTML;

        });

    };

};