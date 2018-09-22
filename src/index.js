const unified = require('unified');
const parse = require('remark-parse');
const render = require('remark-render');

module.exports = unified()
    .use(parse, {})
    .use(render, {})
    .freeze();

