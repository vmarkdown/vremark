const render = require('remark-render');
const vremark = require('../../src/index');

const h = React.createElement;
const Renderer = require('remark-render/renderers/react-renderer');
const renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

const processor = vremark()
    .use(render, {
        renderer: renderer
    });

console.log(processor);

const file = processor.processSync('# h1');
const vdom = file.contents;
ReactDOM.render(
    vdom,
    document.getElementById('preview')
);

// const Renderer = require('../../src/renderers/react/renderer');
//
// const h = React.createElement;
// const renderer = new Renderer({
//     h: h,
//     rootClassName: 'markdown-body'
// });
//
// const vremarkPluginKatex = require('vremark-plugin-katex');
// // const mdText = require('../md/test.txt');
//
// const processor = vremark({
//     renderer: renderer
// }).use(vremarkPluginKatex);
//
// const file = processor.processSync(md);
// const vdom = file.contents;
// ReactDOM.render(
//     vdom,
//     document.getElementById('preview')
// );
