var visit = require('unist-util-visit');
var Diagram =  require('./sequence-diagram');

module.exports = function (options = {}) {

    // var Diagram = options.Diagram || this.data('Diagram') || window['Diagram'];
    //
    // if(!Diagram){
    //     return;
    // }

    return function transformer(root) {

        console.log(Diagram);

        visit(root, 'code', function (node) {

            if(node.lang !== 'sequence') {
                return;
            }

            var code = node.value;
            var diagram = Diagram.parse(code);

            var container = document.createElement('div');
            container.style.width = 0;
            container.style.height = 0;
            // container.style.width = '400';
            // container.style.height = '400';

            document.body.appendChild(container);
            diagram.drawSVG(container, {theme: 'simple'});

            var innerHTML = container.innerHTML;
            container.parentElement.removeChild(container);

            node.properties = node.properties?node.properties:{};
            node.properties.className = 'vremark-sequence';
            node.type = 'html';
            node.value = innerHTML;
        });

    };

};