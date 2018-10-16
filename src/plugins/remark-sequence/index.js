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

        visit(root, {
            type: 'code',
            lang: "sequence"
        }, function (node) {

            var container = createTempContainer();
            var code = node.value;

            var diagram = Diagram.parse(code);
            diagram.drawSVG(container, {theme: 'simple'});
            var innerHTML = container.innerHTML;
            // diagram.clean();

            node.properties = node.properties?node.properties:{};
            node.properties.className = 'remark-sequence';
            node.properties.innerHTML = innerHTML;

        });

    };

};
//
// module.exports = function (options = {}) {
//
//     return function transformer(root) {
//
//         visit(root, 'code', function (node) {
//
//             if(node.lang !== 'sequence') {
//                 return;
//             }
//
//             var code = node.value;
//             var diagram = Diagram.parse(code);
//
//             var container = document.createElement('div');
//             container.style.width = 0;
//             container.style.height = 0;
//             // container.style.width = '400';
//             // container.style.height = '400';
//
//             document.body.appendChild(container);
//             diagram.drawSVG(container, {theme: 'simple'});
//
//             var innerHTML = container.innerHTML;
//             container.parentElement.removeChild(container);
//
//             // node.properties = node.properties?node.properties:{};
//             // node.properties.className = 'vremark-sequence';
//             // node.type = 'html';
//             // node.value = innerHTML;
//         });
//
//     };
//
// };