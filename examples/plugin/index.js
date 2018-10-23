require('github-markdown-css');

const registerComponents = require('./register-components');

import Vue from 'vue';
const vremark = require('../../src/index');

function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time || 1000);
    });
}

import Worker from '../../src/vremark.worker';
const PromiseWorker = require('promise-worker');

const worker = new Worker();
var promiseWorker = new PromiseWorker(worker);

const md = require('../md/test.md');



(async ()=>{

    function parse(markdown, options) {
        return promiseWorker.postMessage({
            markdown: markdown,
            options: options
        });
    }

    const app = new Vue({
        el: '#app',
        data: {
            vdom: null
        },
        render(h) {
            return this.vdom || h('div', {a:1}, 'loading');
        }
    });


    console.time('worker');
    const {mdast, hast, components} = await parse(md, {
        rootClassName: 'markdown-body',
        rootTagName: 'main'
    });
    console.timeEnd('worker');




    console.log( mdast );
    console.log( hast );
    console.log( components );

    await registerComponents(components, function register(name, component) {
        console.log('加载插件', name);
        Vue.component(name, component);
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


