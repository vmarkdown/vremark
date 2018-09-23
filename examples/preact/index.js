const vremark = require('../../src/index');
const renderer = require('remark-preact-renderer');

const math = require('remark-math');
const katex = require('../../src/plugins/katex/index');
const highlight = require('../../src/plugins/highlight/index');
const flowchart = require('../../src/plugins/flowchart/index');
const sequence = require('../../src/plugins/sequence/index');
const mermaid = require('../../src/plugins/mermaid/index');


const { h, render } = preact;

const processor = vremark()
    // .use(function plugin(options) {
    //     return function transform(root) {
    //
    //         debugger
    //
    //         return root;
    //     }
    // })
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
            'rootClassName': 'wysiwyg'
        }
    });

const mdText = require('../md/maxiang.md');
// const mdText = require('../md/test.md');

console.time('parse');
const file = processor.processSync(mdText);
console.timeEnd('parse');

const vdom = file.contents;
console.log(vdom);

console.time('render');
render(vdom, document.getElementById('preview'));
console.timeEnd('render');

// console.time('parse');
// processor.process(mdText, function(err, file) {
//     console.timeEnd('parse');
//
//     if(err){
//         throw err;
//     }
//     console.log(file);
//
//     const vdom = file.contents;
//     preact.render(vdom, document.getElementById('preview'));
// });

// $('.wysiwyg > ')

// const wysiwyg = document.getElementById('preview').children[0];
// wysiwyg.children.forE

/*
var lines = [];

$('.wysiwyg').children().each(function (i, node) {

    console.log(node);
    console.log();

    var top = $(node).offset().top;
    var line = $(node).data('line');
    lines.push({
        top: top,
        line: line
    });

});

console.log(lines);

function findLine(top) {
    for(var i=0;i<lines.length-1;i++) {
        if(top>=lines[i].top && top<=lines[i+1].top){
            return lines[i];
        }
    }
    return null;
}

$(window).scroll(function () {

    var top = $(window).scrollTop();

    console.log(top);
    console.log(findLine(top));
});*/