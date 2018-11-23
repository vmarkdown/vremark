// require('github-markdown-css');
require('./framework.css');
require('./github.css');

const md = require('../md/test.md');
const Vue = require('vue');
// const plugins = {};

// const parse = require('../../src/vremark-parse');
const parse = require('../../src/vremark-worker');
const render = require('../../src/vremark-render');

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            const hast = await parse(md, {
                config: {
                    root: {
                        tagName: 'article',
                        className: 'markdown-body'
                    }
                }
            });

            console.log(hast);

            const h = this.$createElement;
            this.vdom = await render(hast, {
                h:h
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





})();


