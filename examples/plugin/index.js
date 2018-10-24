require('github-markdown-css');

// const registerComponents = require('./register-components');
const loadPlugins = require('./load-plugins');


import Vue from 'vue';

// Vue.component('vremark-highlight',
//     () => import(
//         'vremark-highlight'
//     )
// );

// Vue.component('vremark-highlight', function (resolve) {
//     require(['vremark-highlight'], resolve)
// });

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


// Vue.component('vremark-component-math', require('vremark-component-math'));
// Vue.component('vremark-component-flowchart', require('vremark-component-flowchart'));
// Vue.component('vremark-component-sequence', require('vremark-component-sequence'));
// Vue.component('vremark-component-mermaid', require('vremark-component-mermaid'));
// Vue.component('vremark-component-highlight', require('vremark-component-highlight'));
// Vue.component('vremark-component-g2', require('vremark-component-g2'));
// Vue.component('vremark-component-chart', require('vremark-component-chart'));




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
        methods: {
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

                // await registerComponents(components, function has(name) {
                //         return !!Vue.component(name);
                //         // var has = !!Vue.component(name);
                //         // console.log('判断加载插件', name, has);
                //         // return has;
                // }, function register(name, component) {
                //         console.log('加载插件', name);
                //         Vue.component(name, component);
                // });

                await loadPlugins(plugins, function has(plugin) {
                    return !!Vue.component(plugin.component);
                }, function load(plugin) {
                    return new Promise(async function (resolve, reject) {

                        let component = null;

                        switch (plugin.component) {
                            case 'vremark-math' :
                                component = await import(
                                    /* webpackChunkName: "vremark-component-math" */
                                    'vremark-math'
                                );
                                break;
                            case 'vremark-chart' :
                                component = await import(
                                    /* webpackChunkName: "vremark-component-chart" */
                                    'vremark-chart'
                                );
                                break;
                            case 'vremark-flowchart' :
                                component = await import(
                                    /* webpackChunkName: "vremark-component-flowchart" */
                                    'vremark-flowchart'
                                );
                                break;
                            case 'vremark-g2' :
                                component = await import(
                                    /* webpackChunkName: "vremark-component-g2" */
                                    'vremark-g2'
                                );
                                break;
                            case 'vremark-highlight' :
                                component = await import(
                                    /* webpackChunkName: "vremark-component-highlight" */
                                    'vremark-highlight'
                                );
                                break;
                            case 'vremark-mermaid' :
                                component = await import(
                                    /* webpackChunkName: "vremark-component-mermaid" */
                                    'vremark-mermaid'
                                );
                                break;
                            case 'vremark-sequence' :
                                component = await import(
                                    /* webpackChunkName: "vremark-component-sequence" */
                                    'vremark-sequence'
                                );
                                break;
                        }

                        resolve(component.default || component);

                        // require.ensure(['../../src/plugins/vremark-component-math/plugin'], function(){
                        //     const component = require(plugin.component);
                        //     // debugger
                        //     // Vue.component(component.name, component);
                        //     success(component);
                        // }, plugin.component);

                        // debugger
                        //
                        // const component = await import(
                        //     plugin.component
                        // );
                        //
                        // success(component);

                    });
                }, function register(component) {
                    Vue.component(component.name, component);
                });


                const h = self.$createElement;

                console.time('render');
                const vdom = vremark.render(hast, {
                    h: h
                });
                console.timeEnd('render');
                self.vdom = vdom;
                console.log( vdom );

            }
        },
        render(h) {
            return this.vdom || h('div', {}, 'loading');
        },
        mounted() {
            this.setValue(md);
        }
    });

    // for(var i=0;i<20;i++){
    //     await app.setValue(md);
    //     await sleep(5000);
    // }




//     setTimeout(function () {
//         app.setValue(`\`\`\` python
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
//     }, 5000);





})();


