require('github-markdown-css');
import Vue from 'vue';
const PromiseWorker = require('promise-worker');

const PluginManager = require('../../src/core/plugin-manager');
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

    const pluginManager = new PluginManager({
        plugins: [

        ],
        config: {
            paths: {
                // 'highlight': '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min',
                // 'g2': '//gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.3.2/dist/g2.min',
                // 'chart': '//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min',
                // 'katex': '//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min',
                // // 'katex-css': '//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css',
                // 'flowchart': '//cdnjs.cloudflare.com/ajax/libs/flowchart/1.11.3/flowchart.min',
                // 'Raphael': '//cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min',
                // 'mermaid': '//cdnjs.cloudflare.com/ajax/libs/mermaid/7.1.2/mermaid.min'

            },
            // shim : {
            //     katex: {
            //         deps: [
            //             'css!//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css'
            //         ]
            //     },
            // }
        },
        onOneLoaded: function (plugin) {
            const component = plugin.component || plugin;
            Vue.component(component.name, component);
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
            async setValue(value, noDetect) {

                const self = this;

                console.time('worker');
                const {mdast, hast, plugins} = await parse(value, {
                    rootClassName: 'markdown-body',
                    // rootTagName: 'main',
                    hashid: true,
                    lineNumbers: true,
                    plugins: pluginManager.getPlugins()
                });
                console.timeEnd('worker');


                console.log( mdast );
                console.log( hast );
                console.log( plugins );

                // pluginManager.load(plugins, function () {
                //     self.refresh(hast);
                // });

                const h = self.$createElement;

                console.time('render');
                const vdom = render(hast, {
                    h: h
                });
                console.timeEnd('render');
                self.vdom = vdom;
                console.log( vdom );

                if( !noDetect && plugins.length > 0 ){
                    // pluginManager.detect(mdast, hast).then(function (isRefresh) {
                    //     if(isRefresh) {
                    //         self.setValue(value, true);
                    //     }
                    // });

                    pluginManager.load(plugins).then(function (loaded) {
                        var isRefresh = loaded?loaded.length>0:false;
                        if(isRefresh) {
                            self.setValue(value, true);
                        }
                    });



                }

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

            const md = (await import(
                /* webpackChunkName: "md" */
                '../md/test.md'
                )).default;

            // debugger
            // const md = require('../md/test.md');
            self.setValue(md);

            // for(var i=0;i<20;i++){
            //     await self.setValue(md.replace('马克飞象', ''+new Date().getTime()));
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



    const theme = new Vue({
        el: '#theme',
        data() {
            return {
                theme: 'default',
                themes: [
                    'default',
                    'github',
                    'monokai-sublime',
                    'darcula'
                ]
            }
        },
        methods: {
            setTheme(theme) {
                if(!pluginManager.has('vremark-plugin-highlight')){
                    return;
                }
                const plugin = pluginManager.get('vremark-plugin-highlight');
                plugin.setTheme(theme);
            }
        },
        mounted(){
            const self = this;
            // setTimeout(function () {
            //     self.setTheme('monokai-sublime');
            // }, 1000);
        }
    });








})();


