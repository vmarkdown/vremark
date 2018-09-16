// console.log(vremark);

const md = require('./test.md');

const processor = vremark({h: React.createElement});

console.time('parse');

// const processor = vremark({}).use(vremarkPluginVdom, {
//     h: React.createElement
// });


const file = processor.processSync(md);

console.timeEnd('parse');

const ast = processor.parse(md);
console.log(ast);

console.log(file);

const vdom = file.contents;

ReactDOM.render(
    vdom,
    document.getElementById('app')
);