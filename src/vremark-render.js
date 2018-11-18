// const stringify = require('./lib/vrehype-stringify');
const unified = require('unified');
const plugins = require('vremark-parse/packages/vrehype-plugins');
const vdom = require('vremark-parse/packages/rehype-vdom');

const processor = unified()
    .use(function () {
        this.Parser = function (doc, file) {
            return file.hast;
        };
    })
    .use(plugins).use(vdom).freeze();

module.exports = async function render(hast, options) {
    const file = await processor().data('settings', options).process({
        hast: hast
    });
    return file.contents;
};

// render(
//     {
//         type: 'root',
//         children: [
//
//             {
//                 type: 'element',
//                 tagName: 'pre',
//                 data: {
//                     plugin: 'vremark-plugin-math',
//                     component: 'vremark-component-math',
//                 },
//                 children: [
//                     {
//                         type: 'element',
//                         tagName: 'code',
//                         data: {
//                             plugin: 'vremark-plugin-math',
//                             component: 'vremark-component-math',
//                             props: {
//
//                             }
//                         },
//                         value: 'python'
//                     }
//                 ]
//             }
//
//         ]
//     }
// );





// const file = unified()
//     .use(function (options) {
//         // function compiler(tree) {
//         //     // return toHTML(tree, settings)
//         //     return tree
//         // }
//         this.Compiler = function (tree) {
//             return tree;
//         };
//     })
//     .stringify({
//         children:[],
//         type: 'root'
//     });
//
//
// console.log(file);


    // .freeze();

// module.exports = function render(hast, options) {
//     // console.time('parse');
//     // const file = await processor().data('settings', options).process(text);
//     // console.timeEnd('parse');
//     // return file;
//     console.time('render');
//     const file = processor().data('settings', options).processSync(hast);
//     console.timeEnd('render');
//     return file;
//
// };


// console.log(processor().processSync({}));





// const unified = require('unified');
//
//
// const toVDom = require('vremark-parse/packages/hast-util-to-vdom');
//
// module.exports = function render(hast, options) {
//     return toVDom(hast, options);
// };
