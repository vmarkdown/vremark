const unified = require('unified');
const parse = require('remark-parse');
const math = require('remark-math');
const linkReference = require('./plugins/linkReference/index');
const paragraphHTML = require('./plugins/paragraph-html/index');
const checkbox = require('./plugins/checkbox/index');
const vdom = require('./plugins/vdom/index');

function vremark(options) {
    return unified()
        .use(parse, options)
        .use(linkReference, options)
        .use(paragraphHTML, options)
        .use(checkbox, options)
        .use(math, options)
        .use(vdom, options);
}

module.exports = vremark;





