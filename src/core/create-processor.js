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

function hasPlugin(plugin, plugins) {
    return !!plugins.hasOwnProperty(plugin.PLUGIN_NAME);
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
                enable: hasPlugin(mathComponent, options.plugins),
            }
        ]);
    }

    if(options.flowchart) {
        plugins.push([
            flowchart, {
                enable: hasPlugin(flowchart, options.plugins),
            }
        ]);
    }

    if(options.sequence) {
        plugins.push([
            sequence, {
                enable: hasPlugin(sequence, options.plugins),
            }
        ]);
    }

    if(options.mermaid) {
        plugins.push([
            mermaid, {
                enable: hasPlugin(mermaid, options.plugins),
            }
        ]);
    }

    if(options.chart) {
        plugins.push([
            chart, {
                enable: hasPlugin(chart, options.plugins),
            }
        ]);
    }

    if(options.g2) {
        plugins.push([
            g2, {
                enable: hasPlugin(g2, options.plugins),
            }
        ]);
    }

    if(options.highlight) {
        plugins.push([
            highlight, {
                enable: hasPlugin(highlight, options.plugins),
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

