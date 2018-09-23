const visit = require('unist-util-visit');

var flowchart = require('flowchart.js');

module.exports = function flowchartPlugin(options = {}) {

    // var flowchart = options.flowchart || this.data('flowchart') || window['flowchart'];
    // if(!flowchart){
    //     return;
    // }

    return function transformer(root) {

        visit(root, 'code', function (node) {

            if(node.lang !== 'flow') {
                return;
            }

            var container = document.createElement("div");
            container.style.width = '0';
            container.style.height = '0';
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            document.body.appendChild(container);

            var code = node.value;
            var diagram = flowchart.parse(code);
            diagram.drawSVG(container);

            var innerHTML = container.innerHTML;
            container.parentElement.removeChild(container);

            node.properties = node.properties?node.properties:{};
            node.properties.className = 'vremark-flowchart';
            node.type = 'html'; //'flow';
            node.value = innerHTML;

        });

    };

};