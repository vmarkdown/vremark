const render = require('../../src/render');
import Worker from '../../src/vremark.worker';
const PromiseWorker = require('promise-worker');
const HighlightComponent = require('./components/highlight/highlight');
const MathComponent = require('./components/math/math');
const FlowChartComponent = require('./components/flowchart/flowchart');
const SequenceComponent = require('./components/sequence/sequence');

const G2Component = require('./components/g2/g2');
let md = require('../md/test.md');



const worker = new Worker();
var promiseWorker = new PromiseWorker(worker);

function parse(markdown, options) {
    return promiseWorker.postMessage({
        markdown: markdown,
        options: options
    });
}

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
            math: function (h, node, properties) {
                return h(MathComponent, properties);
            },
            inlineMath: function (h, node, properties) {
                return h(MathComponent, properties);
            },
            component: function (h, node, properties) {

                if( node.data && node.data.props && node.data.props.lang ){
                    var lang = node.data.props.lang;
                    if( lang === 'flow' || lang === 'flowchart' ){
                        return h(FlowChartComponent, properties);
                    }
                    if( lang === 'seq' || lang === 'sequence' ){
                        return h(SequenceComponent, properties);
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



