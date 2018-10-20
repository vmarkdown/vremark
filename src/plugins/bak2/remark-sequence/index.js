var visit = require('unist-util-visit');
var Diagram =  require('./lib/sequence-diagram');
var CONTAINER_TMEP_CREATE_ID = 'remark-sequence-temp-create-container';

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
    container.style.visibility = 'hidden';
    document.body.appendChild(container);
    return container;
}

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        visit(root, function (node) {
            return node.type === 'code' &&
                (node.lang === "sequence" || node.lang === "seq")
        }, function (node) {

            var container = createTempContainer();
            var code = node.value;

            var diagram = Diagram.parse(code);
            diagram.drawSVG(container, {theme: 'simple'});
            var innerHTML = container.innerHTML;
            // diagram.clean();
            container.parentNode.removeChild(container);

            node.properties = node.properties?node.properties:{};
            node.properties.className = 'remark-sequence';
            node.properties.innerHTML = innerHTML;

        });

    };

};
