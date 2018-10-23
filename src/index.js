const unified = require('unified');

//remark
const parse = require('./lib/remark-parse');
const breaks  = require('remark-breaks');
const math = require('./lib/remark-math');
const hash = require('./lib/remark-hash');

const mathComponent = require('./plugins/vremark-math/plugin');
const flowchart = require('./plugins/vremark-flowchart/plugin');
const sequence = require('./plugins/vremark-sequence/plugin');
const mermaid = require('./plugins/vremark-mermaid/plugin');
const chart = require('./plugins/vremark-chart/plugin');
const g2 = require('./plugins/vremark-g2/plugin');
const highlight = require('./plugins/vremark-highlight/plugin');

//rehype
const remark2rehype = require('./lib/remark-rehype');
// const footnote = require('./lib/rehype-footnote/index');

// const stringify = require('rehype-stringify');
const stringify = require('./lib/rehype-vdom');

const defaultOptions = {
    breaks: true,
    math: true,
    allowDangerousHTML: true,


    //plugins
    flowchart: true,
    mermaid: true,
    sequence: true,

    chart: true,
    g2: true,


    highlight: true,


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

        plugins.push([
            mathComponent, {
            }
        ]);
    }

    if(options.flowchart) {
        plugins.push([
            flowchart, {
            }
        ]);
    }

    if(options.sequence) {
        plugins.push([
            sequence, {
            }
        ]);
    }

    if(options.mermaid) {
        plugins.push([
            mermaid, {
            }
        ]);
    }

    if(options.chart) {
        plugins.push([
            chart, {
            }
        ]);
    }

    if(options.g2) {
        plugins.push([
            g2, {
            }
        ]);
    }




    if(options.highlight) {
        plugins.push([
            highlight, {
            }
        ]);
    }

    plugins.push([
        function () {
            return function (root) {
                console.log(root);
            }
        }, {
        }
    ]);





    plugins.push([remark2rehype, {
        allowDangerousHTML: options.allowDangerousHTML
    }]);

    plugins.push([
        function () {
            return function (root) {
                console.log(root);
            }
        }, {
        }
    ]);

    const processor = unified()
        .use(parse, {
            footnotes: true,
            pedantic: true
        })
        .use(hash)
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

