require('github-markdown-css');

const md = require('../md/test.md');
const Vue = require('vue');

const plugins = {
};

const parse = require('../../src/vremark-parse');
const render = require('../../src/vremark-render');
// const toVDom = require('vremark-parse/packages/hast-util-to-vdom');

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            const h = this.$createElement;
            const { mdast, hast } = await parse(md, {
                config: {
                    root: {
                        tagName: 'main',
                        className: 'markdown-body'
                    }
                }
            });
            this.vdom = render(hast, {
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


