const vremark = require('../../src/index');
const renderer = require('remark-preact-renderer');

const math = require('remark-math');
const katex = require('../../src/plugins/katex/index');
const highlight = require('../../src/plugins/highlight/index');
const flowchart = require('../../src/plugins/flowchart/index');
const sequence = require('../../src/plugins/sequence/index');
const mermaid = require('../../src/plugins/mermaid/index');
const { h } = preact;

const processor = vremark()
    .use(function plugin(options) {
        return function transform(root) {
            root.children.forEach(function (node, i) {
                node.properties = node.properties?node.properties:{};
                node.properties['data-line'] = node.position.start.line;
            });
            return root;
        }
    })
    .use(highlight, {
        // 'hljs': window.hljs
    }).use(math).use(katex, {
        // 'katex': window.katex
    }).use(flowchart, {
        // 'flowchart': window.flowchart
    }).use(sequence, {
        // 'Diagram': window.Diagram
    }).use(mermaid, {
        // 'mermaid': window.mermaid
    }).data({
        'settings': {
            'h': h,
            'renderer': renderer,
            'rootClassName': 'markdown-body'
        }
    });

module.exports = processor;