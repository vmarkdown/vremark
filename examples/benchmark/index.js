let md = require('../md/test.md');


console.time('all');

console.time('parse');
var mdast = marked.lexer(md);
console.timeEnd('parse');

console.time('render');
var html = marked.Parser.parse(mdast);
console.timeEnd('render');

console.timeEnd('all');

// console.log(mdast);
// console.log(html);