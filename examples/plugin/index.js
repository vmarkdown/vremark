require('github-markdown-css');
import Vue from 'vue';
const PromiseWorker = require('promise-worker');

// const PluginManager = require('../../src/plugin-manager');
const render = require('../../src/core/render');
import Worker from '../../src/vremark.worker';

function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time || 1000);
    });
}




(async ()=>{

    const worker = new Worker();
    const promiseWorker = new PromiseWorker(worker);

    function parse(markdown, options) {
        return promiseWorker.postMessage({
            markdown: markdown,
            options: options
        });
    }

    const pluginManager = new render.PluginManager({
        loader: function (plugin) {

            return new Promise(function (success, fail) {

                Vue.component(plugin, function (resolve, reject) {
                    requirejs([plugin], function(component){
                        resolve(component);
                        success();
                    }, function (e) {
                        console.error(e);
                        reject();
                        fail();
                    });
                });

            });

        }
    });





    const app = new Vue({
        el: '#app',
        data: {
            vdom: null
        },
        methods: {
            refresh(hast) {
                const self = this;
                const h = self.$createElement;
                console.time('refresh');
                const vdom = render(hast, {
                    h: h
                });
                console.timeEnd('refresh');
                self.vdom = vdom;
            },
            async setValue(value) {

                const self = this;

                console.time('worker');
                const {mdast, hast, plugins} = await parse(value, {
                    rootClassName: 'markdown-body',
                    rootTagName: 'main',
                    hashid: true
                });
                console.timeEnd('worker');


                console.log( mdast );
                console.log( hast );
                console.log( plugins );

                pluginManager.load(plugins, function () {
                    self.refresh(hast);
                });

                const h = self.$createElement;

                console.time('render');
                const vdom = render(hast, {
                    h: h
                });
                console.timeEnd('render');
                self.vdom = vdom;
                console.log( vdom );

            }
        },
        render(h) {
            return this.vdom || h('div', {
                    style:{
                        'text-align':'center'
                    }
                }, 'loading');
        },
        async mounted() {
            const self = this;

            const md = await import(
                /* webpackChunkName: "md" */
                '../md/test.md'
                );
            // const md = require('../md/test.md');
            self.setValue(md.default);
            // for(var i=0;i<20;i++){
            //     await this.setValue(md);
            //     await sleep(5000);
            // }
//             setTimeout(function () {
//                     self.setValue(`\`\`\` python
// @requires_authorization===========
// def somefunc(param1='', param2=0):
//     '''A docstring'''
//     if param1 > param2: # interesting
//         print 'Greater'
//     return (param2 - param1 + 1) or None
// class SomeClass:
//     pass
// >>> message = '''interpreter
// ... prompt'''
// \`\`\``);
//             }, 5000);

        }
    });











})();


