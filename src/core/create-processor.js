const unified = require('unified');

//remark
const parse = require('../lib/remark-parse');
const breaks = require('remark-breaks');
const math = require('../lib/remark-math');
const hash = require('../lib/remark-hash');

// plugins
const mathComponent = require('../lib/vremark-math');
const flowchart = require('../plugins/vremark-plugin-flowchart/plugin');
const sequence = require('../plugins/vremark-plugin-sequence/plugin');
const mermaid = require('../plugins/vremark-plugin-mermaid/plugin');
const g2 = require('../plugins/vremark-plugin-g2/plugin');
const chart = require('../plugins/vremark-plugin-chart/plugin');
const highlight = require('../plugins/vremark-plugin-highlight/plugin');


//rehype
const remark2rehype = require('../lib/remark-rehype');

const stringify = require('../lib/rehype-vdom');

const defaultOptions = require('./defaultOptions.js');

function createProcessor(_options) {
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

