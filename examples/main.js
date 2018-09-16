// console.log(vremark);

const md = require('./md/dillinger.txt');

const vremarkPluginKatex = require('vremark-plugin-katex');

const processor = vremark({h: React.createElement})
    .use(vremarkPluginKatex);

const file = processor.processSync(md);
const vdom = file.contents;

ReactDOM.render(
    vdom,
    document.getElementById('app')
);

// console.time('parse');

// const processor = vremark({}).use(vremarkPluginVdom, {
//     h: React.createElement
// });


// const file = processor.processSync(md);
//
// console.timeEnd('parse');
//
// const ast = processor.parse(md);
// console.log(ast);
//
// console.log(file);
//
// const vdom = file.contents;
//
