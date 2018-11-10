require('github-markdown-css');

// const unified = require('unified');
const md = require('../md/test.md');
const Vue = require('vue');

// const plugins = {
//     'vremark-plugin-math': require('./plugins/vremark-plugin-math')
// };

const plugins = {
    // 'vremark-plugin-math': require('../../src/plugins/vremark-plugin-math')
};




// const PromiseWorker = require('promise-worker');
// import Worker from '../../src/vremark.worker';
// const worker = new Worker();
// const promiseWorker = new PromiseWorker(worker);
//
// function parse(markdown, options) {
//     return promiseWorker.postMessage({
//         markdown: markdown,
//         options: options
//     });
// }

const parse = require('../../src/vremark.parse');

const toVDom = require('vremark-parse/packages/hast-util-to-vdom');

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            // const h = this.$createElement;
            // console.time('process');
            // const { mdast, hast , contents} = await processor.data('settings', {
            //     h:h,
            //     plugins: plugins
            // }).process(md);
            // console.timeEnd('process');
            // this.vdom = contents;
            //
            // console.log(mdast);
            // console.log(hast);
            // console.log(contents);

            const h = this.$createElement;
            const { mdast, hast } = await parse(md);

            this.vdom = toVDom(hast, {
                h:h,
                plugins: plugins
            });

            this.$forceUpdate();
        }
    },
    render(h) {
        return this.vdom || h('div', '=======');
    }
});

// const parse = require('vremark-parse');
// const processor = unified().use(parse);

(async ()=>{

    // requirejs(['vremark-plugin-math'], function (plugin) {
    //     plugins[plugin.name] = plugin;
    //
    //     app.update(md);
    // });



    app.update(md);

    requirejs([
        'vremark-plugin-math',
        'vremark-plugin-flowchart',
        'vremark-plugin-mermaid',
        'vremark-plugin-sequence',
        'vremark-plugin-g2',
        'vremark-plugin-chart',
        'vremark-plugin-highlight'

    ], function () {
        Array.prototype.slice.call(arguments).forEach(function (plugin) {
            plugins[plugin.name] = plugin;
        });

        setTimeout(function () {
            app.update(md);
        }, 5000);
    });



})();


