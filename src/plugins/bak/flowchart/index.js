var visit = require('unist-util-visit');
var flowchart = require('flowchart.js');
var CONTAINER_TMEP_CREATE_ID = 'vremark-flowchart-temp-create-container';

function createTempContainer() {
    var container = null;
    if(container = document.getElementById(CONTAINER_TMEP_CREATE_ID)){
        return container;
    }
    container = document.createElement("div");
    container.id = CONTAINER_TMEP_CREATE_ID;
    container.style.width = '0';
    container.style.height = '0';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    document.body.appendChild(container);
    return container;
}

module.exports = function flowchartPlugin(options = {}) {

    return function transformer(root) {

        visit(root, 'code', function (node) {

            if(node.lang !== 'flow') {
                return;
            }

            var container = createTempContainer();
            var code = node.value;

            var diagram = flowchart.parse(code);
            diagram.drawSVG(container);

            var innerHTML = container.innerHTML;
            // container.parentElement.removeChild(container);

            node.properties = node.properties?node.properties:{};
            node.properties.className = 'vremark-flowchart';
            node.type = 'html'; //'flow';
            node.value = innerHTML;

            diagram.clean();

        });

    };

};