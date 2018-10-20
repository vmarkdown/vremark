const unified = require('unified');
// const remarkParse = require('remark-parse');
// const rehype = require('remark-rehype');

//remark
const markdown = require('./lib/remark-parse');
const breaks  = require('remark-breaks');
// const hashid = require('./plugins/hashid/index');
const math = require('./lib/remark-math');
const component = require('./plugins/remark-component');


//rehype
const remark2rehype = require('./lib/remark-rehype');
const footnote = require('./plugins/rehype-footnote/index');
// const raw = require('rehype-raw');

const defaultOptions = {
    breaks: true,
    hashid: true,
    highlight: true,

    math: {
        katex: true,
    },

    flowchart: true,
    sequence: true,
    mermaid: true,
    plantuml: true,
    raw: false,
    G2: false,
    component: true
};

function createProcessor(options) {

    let processor = unified();

    // remark start
    processor = processor.use(markdown, {
        footnotes: true,
        pedantic: true // fix md error
    });

    if(options.breaks) {
        processor = processor.use(breaks);
    }

    if(options.math) {
        processor = processor.use(math, {});
    }

    if(options.component) {
        processor = processor.use(component);
    }


    // if(options.highlight) {
    //     processor = processor.use(highlight, {
    //
    //     });
    // }
    //
    // if(options.flowchart) {
    //     processor = processor.use(flowchart, {});
    // }

    //
    // if(options.sequence) {
    //     processor = processor.use(sequence, {});
    // }
    //
    // if(options.mermaid) {
    //     processor = processor.use(mermaid, {});
    // }
    //
    // if(options.plantuml) {
    //     processor = processor.use(plantuml, {});
    // }
    //
    // if(options.math) {
    //     processor = processor.use(math, {
    //         // inlineMathDouble: true,
    //         // inlineMathDoubleDisplay: true
    //     });
    // }
    //
    // if(options.hashid) {
    //     processor = processor.use(hashid, {
    //         c: 'content'
    //     });
    // }

    // remark end

    // rehype start

    processor = processor.use(remark2rehype, {
        allowDangerousHTML: false
    });

    // if(options.raw) {
    //     processor = processor.use(raw, {});
    // }
    processor = processor.use(footnote);

    // rehype end


    return processor;
}

function parse(md, options = {}) {
    options = Object.assign({}, defaultOptions, options);
    const processor = createProcessor(options);
    const mdast = processor.parse(md);
    const hast = processor.runSync(mdast);
    // hast.data = {
    //     'class': 'markdown-body'
    // };
    return { mdast, hast };
}

function vremark(markdown, options) {
    const hast = parse(markdown);
    return render(hast, options);
}

vremark.parse = parse;
vremark.render = require('./render');

module.exports = vremark;

