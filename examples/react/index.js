const vremark = require('../../src/index');
const renderer = require('remark-react-renderer');

const h = React.createElement;

const processor = vremark().data({
    'h': h,
    'renderer': renderer,
    'hljs': window.hljs,
    'flowchart': window.flowchart,
    'mermaid': window.mermaid,
    'katex': window.katex,
    'Diagram': window.Diagram,
});

const mdText = require('../md/maxiang.md');
// const mdText = require('../md/test.md');

// const file = processor.processSync(mdText);
// const vdom = file.contents;
// console.log(vdom);

console.time('parse');
processor.process(mdText, function(err, file) {
    console.timeEnd('parse');

    if(err){
        throw err;
    }
    console.log(file);

    const vdom = file.contents;

    ReactDOM.render(
        vdom,
        document.getElementById('preview')
    );



});







// (function () {
//     console.time('parse');
//
//     const vnode = processor.parse(mdText);
//     const vdom = processor.runSync(vnode);
//
//     console.timeEnd('parse');
//     console.log(vnode);
//     console.log(vdom);
// })();


//====================================================================================
// const render = require('remark-render');
// const vremark = require('../../src/index');
//
// const h = React.createElement;
// const Renderer = require('remark-render/renderers/react-renderer');
// const renderer = new Renderer({
//     h: h,
//     rootClassName: 'markdown-body'
// });
//
// const processor = vremark()
//     .use(render, {
//         renderer: renderer
//     });
//
//
//
// const mdText = require('../md/maxiang.md');
//
//
//
//
//
// const file = processor.processSync(mdText);
// const vdom = file.contents;
// console.log(vdom);
//
// ReactDOM.render(
//     vdom,
//     document.getElementById('preview')
// );
//
//
// (function () {
//     const vnode = processor.parse(mdText);
//     const vdom = processor.runSync(vnode);
//     console.log(vdom);
// })();

//====================================================================================


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
