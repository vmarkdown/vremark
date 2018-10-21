require('github-markdown-css');

import Vue from 'vue';
const render = require('../../src/render');
import Worker from '../../src/vremark.worker';
const PromiseWorker = require('promise-worker');
// const MathComponent = require('./components/math/math');

// const HighlightComponent = require('./components/highlight/highlight');
// const FlowChartComponent = require('./components/flowchart/flowchart');
// const SequenceComponent = require('./components/sequence/sequence');
// const MermaidComponent = require('./components/mermaid/mermaid');
// const PlantumlComponent = require('./components/plantuml/plantuml');
// const G2Component = require('./components/g2/g2');
// const Chartomponent = require('./components/chart/chart');


let md = require('../md/test.md');

const worker = new Worker();
var promiseWorker = new PromiseWorker(worker);

function parse(markdown, options) {
    return promiseWorker.postMessage({
        markdown: markdown,
        options: options
    });
}


// Vue.component('test', async function (resolve, reject) {
//
//     const flowchart = await import('flowchart.js');
//
//     debugger
//
//     resolve({
//         render(h) {
//             return h('div',{},'==test==');
//         }
//     });
// });


// Vue.component(
//     'vremark-plugin-flowchart',
//     () => import('./flowchart/flowchart')
// );


document.getElementById('registerPlugin').addEventListener('click', function () {


    console.log('registerPlugin');

    // Vue.component('vremark-plugin-flowchart', async() => {
    //
    //
    //
    // });



});


const unified = require('unified');



(async () => {


    const app = new Vue({
        el: '#app',
        data :{
            vdom: null
        },
        render(h) {

            return this.vdom || h('div', {
                'class': ['markdown-body']
            },'loading...');

        }
    });







})();























// class PluginManager {
//
//     constructor() {
//
//     }
//
//
// }
//
//
// const pluginManager = new PluginManager();

// pluginManager.register()

// require('./plugins/flowchart/vremark-plugin-flowchart');

// async function compile(h, markdown) {
//
//     console.time('worker parse');
//     const {mdast, hast} = await parse(markdown, {});
//     console.timeEnd('worker parse');
//
//     console.log(mdast);
//
//     console.log(hast);
//
//
//     console.time('render');
//     const vdom = render(hast, {
//         rootTagName: 'article',
//         rootClassName: 'markdown-body',
//         mode: 'vue',
//         h: h,
//         renderer: {
//             math: function (h, node, properties) {
//                 // return h(MathComponent, properties);
//             },
//             inlineMath: function (h, node, properties) {
//                 // return h(MathComponent, properties);
//             },
//             component: function (h, node, properties) {
//
//
//
//                 if( node.data && node.data.props && node.data.props.lang ){
//
//                     var lang = node.data.props.lang;
//                     if( lang === 'flow' || lang === 'flowchart' ){
//
//                         const component = Vue.component('vremark-flowchart');
//                         if(component){
//                             return h(component, properties);
//                         }
//
//                         // debugger
//                         // return h('vremark-plugin-flowchart', properties);
//
//                         // return h('vremark-plugin-flowchart', properties);
//
//                         // const AsyncComponent = () => ({
//                         //     component: import('./plugins/flowchart/flowchart'),
//                         //     // loading: LoadingComponent,
//                         //     // error: ErrorComponent,
//                         //     // delay: 200,
//                         //     // timeout: 3000
//                         // });
//                         // return h(AsyncComponent, properties);
//
//                         // return h(async function (resolve, reject) {
//                         //     const plugin = await import('./plugins/flowchart/flowchart');
//                         //     resolve(plugin);
//                         // }, properties);
//                     }
//
//                 }
//
//
//                 // if( node.data && node.data.props && node.data.props.lang ){
//                 //
//                 //     var lang = node.data.props.lang;
//                 //
//                 //     switch (lang) {
//                 //         case 'flow':
//                 //         case 'flowchart':
//                 //
//                 //             // return ()=>import()
//                 //             break;
//                 //
//                 //
//                 //     }
//                 //
//                 //
//                 // }
//
//
//                 // const Component = Vue.component('test');
//                 // return h(Component, properties);
//
//                 // debugger
//                 // if( node.data && node.data.props && node.data.props.lang ){
//                 //     var lang = node.data.props.lang;
//                 //     if( lang === 'flow' || lang === 'flowchart' ){
//                 //         return h(FlowChartComponent, properties);
//                 //     }
//                 //     if( lang === 'seq' || lang === 'sequence' ){
//                 //         return h(SequenceComponent, properties);
//                 //     }
//                 //     if( lang === 'plantuml'){
//                 //         return h(PlantumlComponent, properties);
//                 //     }
//                 //     if( lang === 'mermaid'){
//                 //         return h(MermaidComponent, properties);
//                 //     }
//                 //     if( lang === 'g2' ){
//                 //         return h(G2Component, properties);
//                 //     }
//                 //     if( lang === 'chart' ){
//                 //         return h(Chartomponent, properties);
//                 //     }
//                 //     return h(HighlightComponent, properties);
//                 // }
//
//             }
//         },
//
//     });
//     console.timeEnd('render');
//
//     return vdom;
// }

























// (async () => {
//
//     // Vue.component(
//     //     'async-component',
//     //     () => import('./async-component.js')
//     // );
//
//     const app = new Vue({
//         el: '#app',
//         data :{
//             vdom: null
//         },
//         render(h) {
//
//             return this.vdom || h('div',{
//                 'class': ['markdown-body']
//             },'loading...');
//
//             // return h('div', {
//             //     'class': 'markdown-body'
//             // }, [
//             //     h('async-component', {
//             //         props:{
//             //             a: 1
//             //         }
//             //     })
//             //     // h(function (resolve, reject) {
//             //     //     setTimeout(function () {
//             //     //         resolve({
//             //     //             render(h) {
//             //     //                 return h('p', {}, '======')
//             //     //             }
//             //     //         });
//             //     //     }, 0);
//             //     // })
//             // ]);
//         }
//     });
//
//     // const h = app.$createElement;
//     // console.log(
//     //     h('div', {
//     //         'class': 'markdown-body'
//     //     }, [
//     //         h('async-component', {
//     //             props:{
//     //                 a: 1
//     //             }
//     //         })
//     //     ])
//     // );
//
//     // setTimeout(async function () {
//     //
//     //
//     //
//     //     await import(
//     //         /* webpackChunkName: "vremark-flowchart.plugin" */
//     //         /* webpackMode: "lazy" */
//     //         './plugins/flowchart/vremark-flowchart.plugin'
//     //     );
//     //
//     //     const vdom = await compile(app.$createElement, md);
//     //     console.log(vdom);
//     //     app.vdom = vdom;
//     // }, 100);
//
//
//
//
// })();















// var aaa =Vue;
// console.log(Vue.component('test'));

// (async function f() {
//
//     // console.time('all');
//
//     const app = new Vue({
//         el: '#app',
//         data :{
//             vdom: null
//         },
//         render(h) {
//             return this.vdom || h('div',{
//                 'class': ['markdown-body']
//             },'loading...');
//         }
//     });
//
//
//     const h = app.$createElement;
//
//
//     const vdom = h('div', {
//         'class': 'markdown-body'
//     }, [
//         h(function (resolve, reject) {
//             setTimeout(function () {
//                 resolve({
//                     render(h) {
//                         return h('p', {}, '======')
//                     }
//                 });
//             }, 0);
//         })
//     ]);
//     app.vdom = vdom;
//
//
//
//     // const vdom = await compile(app.$createElement, md);
//     // app.vdom = vdom;
//     // console.log(app.$createElement);
//
//     // for(let i=0;i<100;i++){
//     //     setTimeout(async function () {
//     //         app.vdom = await compile(app.$createElement, md.replace('马克飞象', new Date));
//     //         app.$forceUpdate();
//     //     }, i*2000);
//     // }
//
//
//     // const hast = await parse(mdast, {});
//     // console.log(hast);
//
//
// })();



