require('github-markdown-css');

const unified = require('unified');
const md = require('../md/test.md');
const Vue = require('vue');

// const plugins = {
//     'vremark-plugin-math': require('./plugins/vremark-plugin-math')
// };

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            const h = this.$createElement;
            console.time('process');
            const file = await processor.data('settings', {
                h:h,
                // plugins: plugins
            }).process(md);
            console.timeEnd('process');
            this.vdom = file.contents;

            console.log(file.mdast);
            console.log(file.hast);
            console.log(this.vdom);

            this.$forceUpdate();
        }
    },
    render(h) {
        return this.vdom || h('div', '=======');
    }
});

const parse = require('vremark-parse');
const processor = unified().use(parse);

(async ()=>{
    app.update(md);
})();


