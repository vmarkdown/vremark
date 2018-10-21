const unified = require('unified');

//remark
const parse = require('./lib/remark-parse');
const breaks  = require('remark-breaks');
const math = require('./lib/remark-math');

//rehype
const remark2rehype = require('./lib/remark-rehype');
// const footnote = require('./lib/rehype-footnote/index');

// const stringify = require('rehype-stringify');
const stringify = require('./lib/rehype-vdom');

const defaultOptions = {
    breaks: true,
    math: true,
    allowDangerousHTML: true,

    mode: 'vue',
    h: function () {},
    rootClassName: 'markdown-body',
    rootTagName: 'div'
};


async function vremark(markdown, _options) {

    const options = Object.assign({}, defaultOptions, _options);

    const plugins = [];

    if(options.breaks) {
        plugins.push([
            breaks, {
            }
        ]);
    }

    if(options.math) {
        plugins.push([
            math, {
            }
        ]);
    }

    // plugins.push([
    //     function () {
    //         return function (root) {
    //             console.log(root);
    //         }
    //     }, {
    //     }
    // ]);

    plugins.push([remark2rehype, {
        allowDangerousHTML: options.allowDangerousHTML
    }]);

    const processor = unified()
        .use(parse, {
            footnotes: true,
            pedantic: true
        })
        .use({
            plugins: plugins,
            settings: {}
        })
        .use(stringify, {
            mode: 'vue',
            h: options.h,
            rootClassName: options.rootClassName,
            rootTagName: options.rootTagName
        });

    const file = await processor.process(markdown);

    return file.contents;
}

module.exports = vremark;

