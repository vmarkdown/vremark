require('./index.scss');

const unified = require('unified');
// const remarkParse = require('remark-parse');
// const rehype = require('remark-rehype');

//remark
const parse = require('./lib/remark-parse');
const breaks  = require('remark-breaks');
const hashid = require('./plugins/hashid/index');
const math = require('remark-math');
const flowchart = require('./plugins/remark-flowchart');
const sequence = require('./plugins/remark-sequence');
const mermaid = require('./plugins/remark-mermaid');
const plantuml = require('./plugins/remark-plantuml');
const G2 = require('./plugins/remark-g2');

//rehype
const remark2rehype = require('./lib/remark-rehype');
const katex = require('rehype-katex');
const highlight = require('rehype-highlight');
const footnote = require('./plugins/rehype-footnote/index');
const raw = require('rehype-raw');


const toVdom = require('hast-util-to-vdom');

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
    raw: true,
    G2: false
};

function createProcessor(options) {

    let processor = unified();

    // remark start
    processor = processor.use(parse, {
        footnotes: true,
        pedantic: true // fix md error
    });

    if(options.breaks) {
        processor = processor.use(breaks);
    }

    if(options.flowchart) {
        processor = processor.use(flowchart, {});
    }

    if(options.sequence) {
        processor = processor.use(sequence, {});
    }

    if(options.mermaid) {
        processor = processor.use(mermaid, {});
    }

    if(options.plantuml) {
        processor = processor.use(plantuml, {});
    }

    // if(options.g2) {
    //     processor = processor.use(g2, {});
    // }

    if(options.math) {
        processor = processor.use(math, {
            inlineMathDouble: true,
            inlineMathDoubleDisplay: true
        });
    }




    // if(options.hashid) {
    //     processor = processor.use(hashid, {
    //         c: 'content'
    //     });
    // }

    // remark end

    // rehype start

    processor = processor.use(remark2rehype, {
        allowDangerousHTML: true
    });

    if(options.raw) {
        processor = processor.use(raw, {});
    }

    if(options.math && options.math.katex) {
        processor = processor.use(katex);
    }

    if(options.highlight) {
        processor = processor.data('settings', {fragment: true})
            .use(highlight, {
                ignoreMissing: true
            });
    }

    processor = processor.use(footnote);

    if(options.G2) {
        processor = processor.use(G2, {});
    }

    // rehype end


    return processor;
}

function _parse(markdown, options = {}) {
    options = Object.assign({}, defaultOptions, options);
    const processor = createProcessor(options);
    const mdast = processor.parse(markdown);
    console.log(mdast);
    const hast = processor.runSync(mdast);
    return hast;
}

function render(hast, options) {
    if(options.rootClassName) {
        options.rootClassName = ['vremark-body'].concat(options.rootClassName);
    }
    return toVdom(hast, options);
}

function vremark(markdown, options) {
    const hast = _parse(markdown);
    const vdom = render(hast, options);
    return vdom;
}

vremark.parse = _parse;
vremark.render = render;

module.exports = vremark;

