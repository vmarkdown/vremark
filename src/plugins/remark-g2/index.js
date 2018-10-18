var visit = require('unist-util-visit');
var CONTAINER_TMEP_CREATE_ID = 'vremark-g2-temp-create-container';

var G2Component = require('./g2-component');

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

        visit(root, function (node) {

            if(node.type === 'element' && node.tagName === "pre" && node.children.length > 0){

                var item = node.children[0];

                if(item.type === 'element' && item.tagName === "code"){

                    if(item.properties.className && item.properties.className.indexOf("language-G2.Chart") >-1 ) {
                        return true;
                    }

                }

            }

            return false;

        }, function (node) {



            // var options = {
            //     width: 600,
            //     height: 300,
            //     data: [],
            //     theme: '',
            //     renderer: 'canvas',
            //     forceFit: false
            // };

            var options = {};

            try {
                var code = node.children[0];
                var type = code.properties.className[0].replace('language-G2.', '');
                options.type = type;
                var item = code.children[0];
                var func = new Function('return '+item.value);
                var _options = func();
                Object.assign(options, _options);
            }
            catch (e) {
                options = {};
            }


            node.children = [];
            node.type = 'component';
            // node.type = 'raw';
            node.component = G2Component;
            node.properties = options;

        });



        /*
        visit(root, {
            type: 'code',
            lang: "g2"
        }, function (node) {

            // var container container= createTempContainer();
            //
            // // container.innerHTML = node.value;
            //
            // const data = [
            //     { genre: 'Sports', sold: 275 },
            //     { genre: 'Strategy', sold: 115 },
            //     { genre: 'Action', sold: 120 },
            //     { genre: 'Shooter', sold: 350 },
            //     { genre: 'Other', sold: 150 }
            // ];
            // const chart = new G2.Chart({
            //     container: container,
            //     width : 600,
            //     height : 300,
            //     // renderer: 'svg'
            // });
            // chart.source(data);
            // chart.tooltip(false);
            // chart.interval().position('genre*sold').color('genre');
            // debugger
            //
            // chart.render();


            // var code = node.value;
            //
            // var diagram = flowchart.parse(code);
            // diagram.drawSVG(container);

            // var innerHTML = '<div id="mountNode"></div>\n' + '<script>' +node.value + '</script>';
            // debugger
            // debugger
            // var innerHTML = '<g2></g2>';
            // node.properties = node.properties?node.properties:{};
            // node.properties.className = 'remark-g2';
            // node.properties.innerHTML = innerHTML;




            // var innerHTML = 'g2 innerHTML';
            // debugger
            // node.type = 'component';
            // node.type = 'raw';
            // node.component = G2Component;
            // node.properties = {
            //
            // };


        });
        */


    };

};