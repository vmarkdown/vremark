const Vue = ((Module)=>Module.default||Module)(require('vue'));

function hash(str) {
    var hash = 5381, i = str.length;
    while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

function findFlowChart(root) {
    var children = root.children;
    for(var i=0;i<children.length;i++) {
        var node = children[i];
        if(node.type === 'code' && node.lang && (node.lang === 'flow' || node.lang === 'flowchart' )){
            return true;
        }
    }
    return false;
}

module.exports = function plugin(options = {}) {

    return function transformer(root) {


        let hasFlowChart = false;

        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && node.lang
                && (node.lang === 'flow' || node.lang === 'flowchart' )
            ){

                node.data = node.data || {};
                node.data.key = hash(node.value);
                node.data.props = node.data.props || {};
                Object.assign(node.data.props, {
                    lang: node.lang,
                    code: node.value
                });
                node.component = 'vremark-flowchart';
                node.type = 'component';

                hasFlowChart = true;
            }
        }



        if(!hasFlowChart) {
            return;
        }

        const component = Vue.component('vremark-flowchart');
        if(component) {
            return;
        }

        // debugger

        Vue.component(
            'vremark-flowchart',
            function (resolve, reject) {
                // resolve(require('./src/vremark-flowchart.js'));

                require.ensure([], function(require){
                    const component = require('./src/vremark-flowchart.js');
                    // debugger
                    resolve(component);

                }, 'vremark-flowchart');

            }
        );


        // const hasFlowChart = findFlowChart(root);

        // Vue.component(
        //     'vremark-flowchart',
        //     require('./src/vremark-flowchart.js')
        // );

        // Vue.component(
        //     'vremark-flowchart',
        //     () => import(
        //         /* webpackChunkName: "vremark-flowchart.plugin" */
        //         /* webpackMode: "lazy" */
        //         './src/vremark-flowchart.js'
        //         )
        // );

    };

};