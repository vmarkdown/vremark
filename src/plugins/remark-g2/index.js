var visit = require('unist-util-visit');
var CONTAINER_TMEP_CREATE_ID = 'vremark-g2-temp-create-container';

G2.track(false);

function createTempContainer() {
    var container = null;
    if(container = document.getElementById(CONTAINER_TMEP_CREATE_ID)){
        return container;
    }
    container = document.createElement("div");
    container.id = CONTAINER_TMEP_CREATE_ID;
    // container.style.width = '0';
    // container.style.height = '0';
    // container.style.position = 'absolute';
    // container.style.top = '0';
    // container.style.left = '0';
    // container.style.visibility = 'hidden';
    document.body.appendChild(container);
    return container;
}

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        visit(root, {
            type: 'code',
            lang: "g2"
        }, function (node) {

            var container = createTempContainer();

            // container.innerHTML = node.value;

            const data = [
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 115 },
                { genre: 'Action', sold: 120 },
                { genre: 'Shooter', sold: 350 },
                { genre: 'Other', sold: 150 }
            ];
            const chart = new G2.Chart({
                container: container,
                width : 600,
                height : 300,
                // renderer: 'svg'
            });
            chart.source(data);
            chart.tooltip(false);
            chart.interval().position('genre*sold').color('genre');
            debugger

            chart.render();


            // var code = node.value;
            //
            // var diagram = flowchart.parse(code);
            // diagram.drawSVG(container);

            // var innerHTML = '<div id="mountNode"></div>\n' + '<script>' +node.value + '</script>';
            // debugger
            var innerHTML = node.value;

            // var innerHTML = 'g2 innerHTML';
            node.properties = node.properties?node.properties:{};
            node.properties.className = 'remark-g2';
            node.properties.innerHTML = innerHTML;

        });

    };

};