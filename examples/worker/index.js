const render = require('../../src/render');
import Worker from '../../src/vremark.worker';
const PromiseWorker = require('promise-worker');

const worker = new Worker();
var promiseWorker = new PromiseWorker(worker);

let md = require('../md/test.md');

function parse(markdown, options) {
    return promiseWorker.postMessage({
        markdown: markdown,
        options: options
    });
}


const HighlightComponent = require('./components/highlight/highlight');
const MathComponent = require('./components/math/math');
const FlowChartComponent = require('./components/flowchart/flowchart');
const G2Component = require('./components/g2/g2');

async function compile(h, markdown) {

    console.time('worker parse');
    const {mdast, hast} = await parse(markdown, {});
    console.timeEnd('worker parse');

    console.log(mdast);

    console.log(hast);


    console.time('render');
    const vdom = render(hast, {
        mode: 'vue',
        h: h,
        renderer: {
            // highlight: function (h, node, properties) {
            //     return h(HighlightComponent, properties);
            // },
            math: function (h, node, properties) {
                return h(MathComponent, properties);
            },
            inlineMath: function (h, node, properties) {
                return h(MathComponent, properties);
            },
            // flowchart: function (h, node, properties) {
            //     return h(FlowChartComponent, properties);
            // },
            component: function (h, node, properties) {

                if( node.data && node.data.props && node.data.props.lang ){
                    var lang = node.data.props.lang;
                    if( lang === 'flow' || lang === 'flowchart' ){
                        return h(FlowChartComponent, properties);
                    }
                    if( lang === 'g2' ){
                        return h(G2Component, properties);
                    }
                    // if( lang === 'G2.Chart' ){
                    //     return h(G2Component, properties);
                    // }
                    if( HighlightComponent.hasLanguage(lang) ){
                        return h(HighlightComponent, properties);
                    }
                }


                // if( node.type === 'flow' || node.type === 'flowchart' ){
                //     return h(FlowChartComponent, properties);
                // }
                //
                // if( node.data && node.data.props && node.data.props.lang &&
                //     HighlightComponent.hasLanguage(node.data.props.lang) ){
                //     return h(HighlightComponent, properties);
                // }

                // if( node.type === 'flow' || node.type === 'flowchart' ){
                //
                // }


            }
        }
    });
    console.timeEnd('render');

    return vdom;
}

(async function f() {

    // console.time('all');

    const app = new Vue({
        el: '#app',
        data :{
            vdom: null
        },
        render(h) {
            return this.vdom || h('div',{
                'class': ['markdown-body']
            },'loading...');
        }
    });

    const vdom = await compile(app.$createElement, md);
    app.vdom = vdom;
    // console.log(app.$createElement);

    // for(let i=0;i<100;i++){
    //     setTimeout(async function () {
    //         app.vdom = await compile(app.$createElement, md.replace('马克飞象', new Date));
    //         app.$forceUpdate();
    //     }, i*2000);
    // }




    // const hast = await parse(mdast, {});
    // console.log(hast);


})();


// function run(mdast, options) {
//
//     return promiseWorker.postMessage({
//         type: 'run',
//         data: {
//             mdast: mdast,
//             options: options
//         }
//     });
//
// }

// var index = 0;
//
// worker.addEventListener("message", function (e) {
//
//     var data = e.data;
//
//     console.log(data);
//
//     // console.log(mdast);
//
//
// });
// //
// //
// worker.postMessage({
//     id: index++,
//     markdown: '# h1'
// });

//
// function sendMessage(id, data) {
//     self.postMessage({
//         id: id,
//         data: data
//     });
// }



