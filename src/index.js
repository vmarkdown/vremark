const unified = require('unified');
const remarkParse = require('remark-parse');
const remark2rehype = require('remark-rehype');
// const remark2rehype = require('./lib/remark-rehype');
const breaks  = require('remark-breaks');
const hashid = require('./plugins/hashid/index');
const math = require('remark-math');
const katex = require('rehype-katex');
const highlight = require('rehype-highlight');

const newline = require('./plugins/newline/index');

const toVdom = require('hast-util-to-vdom');

const defaultOptions = {
    breaks: true,
    hashid: true,
    highlight: true,

    math: true,
    katex: true,

};

function parse(markdown, options = {}) {

    options = Object.assign({}, defaultOptions, options);

    let processor = unified()
        .use(remarkParse, {
            footnotes: true
        });

    if(options.breaks) {
        processor = processor.use(breaks);
    }
    if(options.hashid) {
        processor = processor.use(hashid);
    }

    if(options.math) {
        processor = processor.use(math);
    }

    processor = processor.use(remark2rehype);


    if(options.math && options.katex) {
        processor = processor.use(katex);
    }

    if(options.highlight) {
        processor = processor.data('settings', {fragment: true})
            .use(highlight, {
                ignoreMissing: true
            });
    }

    processor = processor.use(newline);

    const mdast = processor.parse(markdown);
    const hast = processor.runSync(mdast);
    return hast;
}

function render(hast, options) {
    return toVdom(hast, options);
}

function vremark(markdown, options) {
    const hast = parse(markdown);
    const vdom = render(hast, options);
    return vdom;
}

vremark.parse = parse;
vremark.render = render;

module.exports = vremark;

