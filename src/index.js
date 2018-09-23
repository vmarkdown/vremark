const unified = require('unified');
const parse = require('remark-parse');
const render = require('remark-render');
const paragraphHTML2Text = require('./plugins/paragraph-html-to-text/index');

module.exports = unified()
    .use(parse, {})
    .use(paragraphHTML2Text, {})
    .use(render, {})
    .freeze();

