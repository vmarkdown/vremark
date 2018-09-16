const Renderer = require('../../src/renderers/vue/renderer');

const renderer = new Renderer({
    rootClassName: 'markdown-body'
});

const vremarkPluginKatex = require('vremark-plugin-katex');

const processor = vremark({
    renderer: renderer
}).use(vremarkPluginKatex);

function parse(md) {
    const file = processor.processSync(md);
    return file.contents;
}

const app = new Vue({
    el: '#app',
    render(h) {
        renderer.h(h);

        const vdom = parse(require('../md/maxiang.txt'));
        console.log(vdom);
        return vdom;


        // var el = h('div',{
        //     'class': {
        //         'markdown-body': true
        //     }
        // },vnodes);
        // //
        // console.log(el);
        //
        // return el
    }
});