const vremark = require('../../src/index');
const renderer = require('remark-preact-renderer');

// const math = require('remark-math');
// const katex = require('../../src/plugins/katex/index');
// const highlight = require('../../src/plugins/highlight/index');
// const flowchart = require('../../src/plugins/flowchart/index');
// const sequence = require('../../src/plugins/sequence/index');
// const mermaid = require('../../src/plugins/mermaid/index');

const sequence = require('../../dist/vremark-plugin-sequence');

const { h, render } = preact;

const processor = vremark()
    .use(sequence, {})
    // .use(highlight, {
    //     'hljs': window.hljs
    // }).use(math).use(katex, {
    //     'katex': window.katex
    // }).use(flowchart, {
    //     'flowchart': window.flowchart
    // }).use(sequence, {
    //     'Diagram': window.Diagram
    // }).use(mermaid, {
    //     'mermaid': window.mermaid
    // })
    .data({
        'settings': {
            'h': h,
            'renderer': renderer,
            'rootClassName': 'wysiwyg'
        }
    });

const mdText = require('../md/test.md');

console.time('parse');
const file = processor.processSync(mdText);
console.timeEnd('parse');

const vdom = file.contents;
console.log(vdom);

console.time('render');
render(vdom, document.getElementById('preview'));
console.timeEnd('render');
