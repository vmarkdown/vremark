const visit = require('unist-util-visit');

module.exports = function (options = {}) {

    var Diagram = options.Diagram || this.data('Diagram') || window['Diagram'];

    return function transformer(root) {

        visit(root, 'code', function (node) {

            if(node.lang !== 'sequence') {
                return;
            }

            var code = node.value;
            var diagram = Diagram.parse(code);

            var container = document.createElement('div');
            container.style.width = 0;
            container.style.height = 0;
            document.body.appendChild(container);
            diagram.drawSVG(container, {theme: 'simple'});
            var innerHTML = container.innerHTML;
            container.parentElement.removeChild(container);

            node.props = node.props?node.props:{};
            node.props.className = 'vremark-sequence';
            node.type = 'html';
            node.value = innerHTML;
        });

    };

};