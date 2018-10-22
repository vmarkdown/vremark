const Vue = ((Module)=>Module.default||Module)(require('vue'));

const util = require('vremark-util');

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

                //key Duplicate keys (hash + num)
                node.data.key = util.hash(node.value);

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

        const AsyncComponent = () => ({
            component: import(
                /* webpackChunkName: "vremark-flowchart.plugin" */
                /* webpackMode: "lazy" */
                './src/vremark-flowchart.js'
            ),
            loading: {
                render(h) {
                    return h('div', {}, 'loading');
                }
            },
            error: {
                render(h) {
                    return h('div', {}, 'error');
                }
            },
            delay: 200,
            timeout: 30000
        });

        Vue.component('vremark-flowchart', AsyncComponent);

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