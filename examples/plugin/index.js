require('github-markdown-css');

// const registerComponents = require('./register-components');
const loadPlugins = require('./load-plugins');

import Vue from 'vue';

// const vremark = require('../../src/index');
const render = require('../../src/core/render');


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



// Vue.component('vremark-component-math', require('vremark-component-math'));
// Vue.component('vremark-component-flowchart', require('vremark-component-flowchart'));
// Vue.component('vremark-component-sequence', require('vremark-component-sequence'));
// Vue.component('vremark-component-mermaid', require('vremark-component-mermaid'));
// Vue.component('vremark-component-highlight', require('vremark-component-highlight'));
// Vue.component('vremark-component-g2', require('vremark-component-g2'));
// Vue.component('vremark-component-chart', require('vremark-component-chart'));

function registerPlugin() {
    
}

// function loadPlugin(plugin, callback) {
//
//     if(Vue.component(plugin)){
//         return true;
//     }
//
//     Vue.component(plugin,  function (resolve, reject) {
//
//         switch (plugin) {
//             case 'vremark-plugin-math': {
//                 require(['vremark-plugin-math'], function(component){
//                     resolve(component);
//                     setTimeout(function () {
//                         callback();
//                     }, 0);
//                 });
//                 break;
//             }
//         }
//
//     });
//
//
//     // Vue.component(plugin,  function (resolve, reject) {
//     //     require.ensure([], function(){
//     //
//     //         var component = null;
//     //
//     //         switch (plugin) {
//     //             case 'vremark-plugin-math': {
//     //                 component = require('vremark-plugin-math');
//     //                 break;
//     //             }
//     //         }
//     //
//     //         // var component = require('vremark-plugin-math');
//     //         resolve(component);
//     //
//     //         setTimeout(function () {
//     //             vm.refresh(hast);
//     //         }, 0);
//     //
//     //     }, 'vremark-plugin-math');
//     // });
//
//
//
//
//     // if(Vue.component(plugin)){
//     //     return;
//     // }
//     //
//     // Vue.component(plugin, function (resolve, reject) {
//     //
//     //     setTimeout(function () {
//     //
//     //
//     //         require.ensure(['vremark-plugin-math'], function(){
//     //             var component = require(plugin);
//     //             resolve(component);
//     //
//     //             setTimeout(function () {
//     //                 vm.refresh(hast);
//     //             }, 0);
//     //
//     //
//     //         }, plugin);
//     //
//     //         // resolve(require(plugin));
//     //
//     //
//     //     }, 1000);
//     //
//     //
//     //
//     //
//     // });
// }


// function loadPlugins(plugins, callback) {
//
//
//     Object.keys(plugins).forEach(function (plugin) {
//         loadPlugin(plugin, callback);
//     });
//
//
//
//
//     // Object.keys(plugins).forEach(function (plugin) {
//     //     loadPlugin(plugin, vm, hast);
//     // });
//
//
//     // Vue.component('vremark-plugin-math', function (resolve, reject) {
//     //
//     //     setTimeout(function () {
//     //         resolve(require('vremark-plugin-math'));
//     //         setTimeout(function () {
//     //             vm.refresh(hast);
//     //         }, 0);
//     //     }, 1000);
//     //
//     //
//     //
//     //
//     // });
//
//
//
// }

(async ()=>{

    function load(plugin) {
        return new Promise(function (resolve, reject) {

            requirejs([plugin], function(component){
                resolve(component);
            });

            /*
            switch (plugin) {
                case 'vremark-plugin-math': {
                    requirejs(['vremark-plugin-math'], function(component){
                        resolve(component);
                    });
                    break;
                }
                case 'vremark-plugin-chart': {
                    require(['vremark-plugin-chart'], function(component){
                        resolve(component);
                    });
                    break;
                }
                case 'vremark-plugin-flowchart': {
                    require(['vremark-plugin-flowchart'], function(component){
                        resolve(component);
                    });
                    break;
                }
                case 'vremark-plugin-g2': {
                    require(['vremark-plugin-g2'], function(component){
                        resolve(component);
                    });
                    break;
                }
                case 'vremark-plugin-highlight': {
                    require(['vremark-plugin-highlight'], function(component){
                        resolve(component);
                    });
                    break;
                }
                case 'vremark-plugin-mermaid': {
                    require(['vremark-plugin-mermaid'], function(component){
                        resolve(component);
                    });
                    break;
                }
                case 'vremark-plugin-sequence': {
                    require(['vremark-plugin-sequence'], function(component){
                        resolve(component);
                    });
                    break;
                }
                default: {
                    reject();
                }
            }
            */

        });
    }

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

                function refresh() {
                    self.refresh(hast);
                }

                loadPlugins(plugins, function has(plugin) {
                    return !!Vue.component(plugin);
                }, function register(plugin) {
                    console.log('加载插件', plugin);

                    Vue.component(plugin, async function (resolve, reject) {
                        const component = await load(plugin);
                        if(component){
                            resolve(component);
                            refresh();
                        }
                        else {
                            reject();
                        }
                    });
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


