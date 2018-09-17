const unified = require('unified');
const parse = require('remark-parse');
const toc = require('remark-toc');
const math = require('remark-math');
const linkReference = require('./plugins/linkReference/index');
const paragraphHTML2Text = require('./plugins/paragraph-html-to-text/index');
const checkbox = require('./plugins/checkbox/index');
// const render = require('remark-render');

// const Renderer = require('remark-render/renderers/react-renderer');

module.exports = unified()
        .use(parse, {})
        .use(toc, {
            // heading: '[TOC]'
        })
        .use(linkReference, {})
        .use(paragraphHTML2Text, {})
        .use(checkbox, {})
        .use(math, {})
        // .use(render, {})
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





