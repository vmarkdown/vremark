const unified = require('unified');
const remarkParse = require('./lib/remark-parse');
const rehype = require('./lib/remark-rehype');
// const remarkParse = require('remark-parse');
// const rehype = require('remark-rehype');
const breaks  = require('remark-breaks');
const hashid = require('./plugins/hashid/index');
const math = require('remark-math');
const katex = require('rehype-katex');
const highlight = require('rehype-highlight');
const flowchart = require('./plugins/rehype-flowchart');

const toVdom = require('hast-util-to-vdom');

const defaultOptions = {
    breaks: true,
    hashid: true,
    highlight: true,

    math: {
        katex: true,
    },

    flowchart: true

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
        processor = processor.use(hashid, {
            c: 'content'
        });
    }

    if(options.math) {
        processor = processor.use(math);
    }

    processor = processor.use(rehype);


    if(options.math && options.math.katex) {
        processor = processor.use(katex);
    }

    if(options.highlight) {
        processor = processor.data('settings', {fragment: true})
            .use(highlight, {
                ignoreMissing: true
            });
    }

    if(options.flowchart) {
        processor = processor.use(flowchart, {});
    }

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

