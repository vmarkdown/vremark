const unified = require('unified');

//remark
const parse = require('../lib/remark-parse');
const breaks = require('remark-breaks');
const math = require('../lib/remark-math');
const hash = require('../lib/remark-hash');

// plugins
const mathComponent = require('../lib/vremark-math');
const flowchart = require('../lib/vremark-flowchart');
const sequence = require('../lib/vremark-sequence');
const mermaid = require('../lib/vremark-mermaid');
const g2 = require('../lib/vremark-g2');
const chart = require('../lib/vremark-chart');
const highlight = require('../lib/vremark-highlight');


//rehype
const remark2rehype = require('../lib/remark-rehype');

const stringify = require('../lib/rehype-vdom');

const defaultOptions = require('./defaultOptions.js');

function hasPlugin(name, plugins) {
    // return !!plugins.hasOwnProperty(name);
    return plugins.indexOf(name) > -1;
}

function createProcessor(_options) {
    const options = Object.assign({}, defaultOptions, _options);

    // const hasPlugins = options.plugins;
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

    if(options.highlight && hasPlugin('vremark-plugin-highlight', options.plugins)) {
        plugins.push([
            highlight, {
                lineNumbers: options.lineNumbers
            }
        ]);
    }

    if(options.hash) {
        plugins.push([
            hash, {
            }
        ]);
    }

    const processor = unified()
        .use(parse, {
            footnotes: true,
            pedantic: true
        })
        .use({
            plugins: plugins,
            settings: {}
        })
        .use(remark2rehype, {
            allowDangerousHTML: options.allowDangerousHTML
        })
        .use(stringify, {
            mode: 'vue',
            h: options.h
        });

    return processor;
}

module.exports = createProcessor;

