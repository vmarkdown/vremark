var visit = require('unist-util-visit');
var mermaid = require('mermaid');
var index = 0;

mermaid.initialize({
    flowchart:{
        htmlLabels: false
    }
});

mermaid.startOnLoad = true;

mermaid.mermaidAPI.initialize({
    startOnLoad: true
});

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        visit(root, {
            type: 'code',
            lang: "mermaid"
        }, function (node) {

            var graphDefinition = node.value;
            var innerHTML = mermaid.mermaidAPI.render('mermaid_'+index++, graphDefinition);

            node.properties = node.properties?node.properties:{};
            node.properties.className = 'remark-mermaid';
            node.properties.innerHTML = innerHTML;

        });

    };

};