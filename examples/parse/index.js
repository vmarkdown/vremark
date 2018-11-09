
const unified = require('unified')
const remarkParse = require('remark-parse')
const stringify = require('rehype-stringify')
const remark2rehype = require('remark-rehype')

const remarkAlign = require('./remark-align')

const md =
`# h1
->paragraph<-
`;
unified()
    .use(remarkParse)
    .use(remarkAlign, {
        left: 'align-left',
        center: 'align-center',
        right: 'align-right',
    })
    .use(remark2rehype)
    .use(stringify).process(md, function (error, file) {
    console.log(file.contents);
});


