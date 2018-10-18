// require('./timer');
// require('./g2');

const vremark = require('../../src/index');

let md = require('../md/g2.md');

const app = new Vue({
    el: '#app',
    render(h) {

        console.time('all');

        console.time('parse');
        const hast = vremark.parse(md, {

            breaks: false,
            hashid: false,
            highlight: false,

            math: {
                katex: false,
            },

            flowchart: false,
            sequence: false,
            mermaid: false,
            plantuml: false,

            raw: true,
            G2: true

        });
        console.timeEnd('parse');

        console.time('render');
        const vdom = vremark.render(hast, {
            h: h,
            mode: 'vue',
            rootClassName: 'markdown-body'
        });
        console.timeEnd('render');

        console.timeEnd('all');

        console.log(hast);

        return vdom;

    }
});
