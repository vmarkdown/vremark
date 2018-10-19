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


const HighlightComponent = require('./components/highlight-component');
const MathComponent = require('./components/math-component');

async function compile(h, markdown) {

    console.time('parse');
    const {mdast, hast} = await parse(markdown, {});
    console.timeEnd('parse');

    console.log(mdast);

    console.log(hast);


    console.time('render');
    const vdom = render(hast, {
        mode: 'vue',
        h: h,
        renderer: {
            highlight: function (h, node, properties) {
                return h(HighlightComponent, properties);
            },
            math: function (h, node, properties) {
                return h(MathComponent, properties);
            },
            inlineMath: function (h, node, properties) {
                return h(MathComponent, properties);
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



