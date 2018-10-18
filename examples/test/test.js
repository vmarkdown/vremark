const unified = require('unified');
const parse = require('remark-parse');
const math = require('remark-math');

let processor = unified().use(parse, {
    footnotes: true,
    pedantic: true // fix md error
})//.use(math);

var md = require('fs').readFileSync('../md/test.md');

console.dir(processor.parse(md), {depth: null});