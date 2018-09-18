const visit = require('unist-util-visit');

module.exports = function (options = {}) {

    var sequence = options.sequence || this.data('sequence') || window['sequence'];

    return function transformer(root) {

        visit(root, 'code', function (node) {

            if(node.lang !== 'sequence') {
                return;
            }

            // var container = document.createElement("div");
            // container.style.width = 0;
            // container.style.height = 0;
            // document.body.appendChild(container);
            //
            // var code = node.value;
            // var diagram = flowchart.parse(code);
            // diagram.drawSVG(container);
            //
            // var innerHTML = container.innerHTML;
            // container.parentElement.removeChild(container);
            //
            // node.className = 'vremark-flowchart';
            // node.type = 'html'; //'flow';
            // node.value = innerHTML;

        });

    };

};