// require('github-markdown-css');
require('./framework.css');
require('./github.css');

// const md = require('../md/test.md');
const Vue = require('vue');

function register(component) {
    Vue.component(component.name, component);
}
// const parse = require('../../src/vremark-parse');
const parse = require('../../src/vremark-worker');
const render = require('../../src/vremark-render');

// const Plugins = require('../../plugins');
//
// const plugins = [];
// Plugins.forEach(function (Plugin) {
//     const plugin = new Plugin();
//     plugins.push(plugin);
// });

const plugins = require('../../plugins/index');

const settings = {
    flowchart: false
};

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {

            console.time('worker');
            const vast = await parse(md, {
                config: {
                    root: {
                        tagName: 'article',
                        className: 'markdown-body'
                    }
                }
            });
            console.timeEnd('worker');
            console.log(vast);

            const h = this.$createElement;
            this.vdom = await render(vast, plugins,
                Object.assign({}, settings, {
                    register: register,
                    h:h,
                })
            );

            this.$forceUpdate();
        }
    },
    render(h) {
        return this.vdom || h('div', '=======');
    }
});

(async ()=>{

    // app.update(md);

    setTimeout(function () {
        app.update(require('./1.md'));
    }, 100);

    // setTimeout(function () {
    //     app.update(require('./2.md'));
    // }, 5000);

})();


