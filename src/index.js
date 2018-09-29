const unified = require('unified');
const parse = require('remark-parse');
const render = require('remark-render');
const paragraphHTML2Text = require('./plugins/paragraph-html-to-text/index');
const footnote = require('./plugins/footnote/index');

module.exports = unified()
    .use(parse, {
        footnotes: true
    })
    .use(paragraphHTML2Text, {})
    .use(footnote, {})
    .use(render, {})
    .freeze();

