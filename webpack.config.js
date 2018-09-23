const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: "[name]",
        // libraryExport: 'default'
    },
    module: {
    },
    externals: {
        // 'react': 'React',
        // 'vremark-plugin-katex': 'vremarkPluginKatex'
    },
    plugins: [
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};

module.exports = [
    merge(config, {
        entry:{
            vremark: './src/index.js'
        }
    }),
    merge(config, {
        entry:{
            'vremark-plugin-flowchart': './src/plugins/flowchart/index.js'
        },
        externals: {
            'flowchart.js': 'flowchart',
            'Raphael': 'Raphael',
            'raphael': 'Raphael'
        },
    }),
    merge(config, {
        entry:{
            'vremark-plugin-highlight': './src/plugins/highlight/index.js'
        },
        externals: {
            'highlight.js': 'hljs'
        },
    }),
    merge(config, {
        entry:{
            'vremark-plugin-katex': './src/plugins/katex/index.js'
        },
        externals: {
            'katex': 'katex'
        },
    }),
    merge(config, {
        entry:{
            'vremark-plugin-mermaid': './src/plugins/mermaid/index.js'
        },
        externals: {
            'mermaid': 'mermaid'
        },
    }),
    merge(config, {
        entry:{
            'vremark-plugin-sequence': './src/plugins/sequence/index.js'
        },
        externals: {
            // 'underscore': '_'
        },
    }),
    merge(config, {
        entry:{
            'vremark-plugin-toc': './src/plugins/toc/index.js'
        },
        externals: {
            // 'underscore': '_'
        },
    })
];

