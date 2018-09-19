const unified = require('unified');
const parse = require('remark-parse');
// const toc = require('./plugins/toc/index');
// const toc = require('./plugins/toc/index');
const math = require('remark-math');
const katex = require('./plugins/katex/index');
const linkReference = require('./plugins/linkReference/index');
const paragraphHTML2Text = require('./plugins/paragraph-html-to-text/index');
const checkbox = require('./plugins/checkbox/index');
const flowchart = require('./plugins/flowchart/index');
const sequence = require('./plugins/sequence/index');
const mermaid = require('./plugins/mermaid/index');
const render = require('remark-render');
const breaks = require('remark-breaks');
const highlight = require('./plugins/highlight/index');

module.exports = unified()
    .use(parse, {})
    .use(highlight, {lineNumbers: false})
    //basic
    // .use(toc, {
    //     // heading: '[TOC]'
    // })
    .use(linkReference, {})
    .use(paragraphHTML2Text, {})
    .use(checkbox, {})
    .use(breaks)

    //ext
    .use(math, {}).use(katex, {})
    .use(flowchart, {})
    .use(mermaid, {})
    .use(sequence, {})

    .use(render, {mode: 'react'})
    .freeze();

// module.exports = unified().use(parse).use(stringify).freeze();

// function vremark(options) {
//     return unified()
//         .use(parse, options)
//         .use(toc, {
//             // heading: '[TOC]'
//         })
//         .use(linkReference, options)
//         .use(paragraphHTML, options)
//         .use(checkbox, options)
//         .use(math, options)
//         .use(render, options);
// }
//
// vremark.Renderer = require('./renderers/renderer');
// module.exports = vremark;





