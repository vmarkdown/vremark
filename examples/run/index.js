const vremark = require('../../src/index');
const h = React.createElement;

const processor = vremark().data({
    'h': h,
    'flowchart': window.flowchart,
    'mermaid': window.mermaid,
    'katex': window.katex,
    'Diagram': window.Diagram,
});

const mdText = require('../md/toc.md');

(function () {
    console.time('parse');

    const vnode = processor.parse(mdText);
    const vdom = processor.runSync(vnode);

    console.timeEnd('parse');

    console.log(vdom);
})();
