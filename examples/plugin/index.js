require('github-markdown-css');

import Vue from 'vue';
const vremark = require('../../src/index');

const md = require('../md/test.md');




// function sleep(time) {
//     return new Promise(function (resolve) {
//         setTimeout(function () {
//             resolve();
//         }, time || 1000);
//     });
// }
//
// (async ()=>{
//
//     const app = new Vue({
//         el: '#app',
//         data :function () {
//             return {
//                 vdom: null
//             }
//         },
//         methods:{
//             async setValue(md) {
//                 // const self = this;
//                 // self.result.change = true;
//                 // Vue.set(app, 'md', md);
//                 // app.$forceUpdate();
//
//                 const self = this;
//                 const h = self.$createElement;
//                 console.time('compile');
//                 const vdom = await vremark(md, {
//                     mode: 'vue',
//                     h: h,
//                     rootClassName: 'markdown-body',
//                     rootTagName: 'main',
//                     hashid: true
//                 });
//                 console.timeEnd('compile');
//
//                 self.vdom = vdom;
//
//             }
//         },
//         render(h) {
//             const self = this;
//             return self.vdom || h('div', {}, 'loading');
//
//         }
//     });
//
//     app.setValue(md);
//
//
// })();
//
//
//
//



import Worker from '../../src/vremark.worker';
const PromiseWorker = require('promise-worker');

const worker = new Worker();
var promiseWorker = new PromiseWorker(worker);




(async ()=>{

    function parse(markdown, options) {
        return promiseWorker.postMessage({
            markdown: markdown,
            options: options
        });
    }

    console.time('worker');

    const {mdast, hast} = await parse(md, {
        rootClassName: 'markdown-body',
        rootTagName: 'main'
    });

    console.timeEnd('worker');

    console.log( mdast )
    console.log( hast )





    const app = new Vue({
        el: '#app',
        data: {
            vdom: null
        },
        render(h) {
            return this.vdom || h('div', {a:1}, 'loading');
        }
    });


    const h = app.$createElement;

    console.time('render');
    const vdom = vremark.render(hast, {
        h: h
    });
    console.timeEnd('render');
    app.vdom = vdom;
    console.log( vdom )


})();

// const visit = require('unist-util-visit');
//
//
// import Vue from 'vue';
// const unified = require('unified');
// const markdown = require('remark-parse');
// const remark2rehype = require('remark-rehype');
// const stringify = require('rehype-stringify');
//
// const flowchart = require('../../src/plugins/vremark-flowchart/vremark-flowchart.plugin');
//
//
// let md = require('../md/test.md');
//
// (async () => {
//
//
//     const processor = unified()
//         .use(markdown, {
//             footnotes: true,
//             pedantic: true // fix md error
//         })
//         .use(flowchart)
//         .use(remark2rehype)
//         .use(stringify);
//
//
//     const file = await processor.process(md);
//
//     console.log(file);
//
//     const app = new Vue({
//         el: '#app',
//         // data :{
//         //     vdom: null
//         // },
//         render(h) {
//
//             return h('div', {
//                 class: 'markdown-body',
//                 domProps: {
//                     // innerHTML: file.contents
//                 }
//             }, [
//
//                 h('vremark-flowchart', {
//                     props:{
//                         code: `flow
// st=>start: Start
// e=>end
// op=>operation: My Operation
// cond=>condition: Yes or No?
//
// st->op->cond
// cond(yes)->e
// cond(no)->op`
//                     }
//                 })
//
//
//             ]);
//             // return this.vdom || h('div', {
//             //     'class': ['markdown-body']
//             // },'loading...');
//
//         }
//     });
//
//
//
//
//
//
//
// })();

