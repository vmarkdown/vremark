const visit = require('unist-util-visit');

var index = 0;


module.exports = function mermaidPlugin(options = {}) {

    var mermaid = options.mermaid || this.data('mermaid') || window['mermaid'];

    mermaid.initialize({
        flowchart:{
            htmlLabels: false
        }
    });

    mermaid.mermaidAPI.initialize({
        startOnLoad: true
    });

    return function transformer(root) {

        visit(root, 'code', function (node) {

            if(node.lang !== 'mermaid') {
                return;
            }

            var graphDefinition = node.value;

            var svgGraph = mermaid.mermaidAPI.render('id1'+index++, graphDefinition);

            node.className = 'vremark-mermaid';
            node.type = 'html';
            node.value = svgGraph;

        });

    };

};