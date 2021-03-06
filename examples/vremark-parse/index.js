// require('github-markdown-css');
require('./framework.css');
require('./github.css');

const md = require('../md/test.md');
const Vue = require('vue');
// const plugins = {};

function loader(names) {
    return new Promise(function (resolve, reject) {
        requirejs(names, function () {
            const Plugins = Array.prototype.slice.call(arguments);
            resolve(Plugins);
        }, function () {
            reject();
        });
    });
}

// const parse = require('../../src/vremark-parse');
const parse = require('../../src/vremark-worker');
const render = require('../../src/vremark-render');

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            const { mdast, hast } = await parse(md, {
                config: {
                    root: {
                        tagName: 'article',
                        className: 'markdown-body'
                    }
                }
            });

            console.log(mdast);
            console.log(hast);

            const h = this.$createElement;
            this.vdom = await render(hast, {
                h:h,
                loader: loader,
                Vue: Vue
            });

            this.$forceUpdate();
        }
    },
    render(h) {
        return this.vdom || h('div', '=======');
    }
});

(async ()=>{


    app.update(md);


    // requirejs([
    //     // 'vremark-plugin-math',
    //     'vremark-plugin-flowchart',
    //     // 'vremark-plugin-mermaid',
    //     // 'vremark-plugin-sequence',
    //     // 'vremark-plugin-g2',
    //     // 'vremark-plugin-chart',
    //     // 'vremark-plugin-highlight'
    //     // 'vremark-plugin-resume'
    //
    // ], function () {
    //     Array.prototype.slice.call(arguments).forEach(function (plugin) {
    //         // plugins[plugin.name] = plugin;
    //         Vue.component(plugin.component.name, plugin.component);
    //         plugins[plugin.name] = plugin;
    //         // plugins[plugin.name] = {
    //         //     component: plugin.component.name
    //         // }
    //         // plugins[plugin.name] = {
    //         //     component: plugin.component.name
    //         // }
    //     });
    //
    //     setTimeout(function () {
    //         app.update(md);
    //     }, 0);
    // });



})();


