const vremark = require('../../src/index');

// const React = require('react');

const h = React.createElement;
// const Renderer = require('remark-render/renderers/react-renderer');
// const renderer = new Renderer({
//     h: h,
//     rootClassName: 'markdown-body'
// });

const processor = vremark().data({
    'h': h,
    'flowchart': flowchart
});
    // .use(render, {
    //     renderer: renderer
    // });

const mdText = require('../md/test.md');


// const file = processor.processSync(mdText);
// const vdom = file.contents;
// console.log(vdom);

processor.process(mdText, function(err, file) {
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
//     const vnode = processor.parse(mdText);
//     const vdom = processor.runSync(vnode);
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
