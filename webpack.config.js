const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const production = (process.env.NODE_ENV === 'production');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].common.js',
        // filename: production?'[name].common.min.js':'[name].common.js',
        // libraryTarget: "umd",
        // libraryTarget: "commonjs2",

        library: "[name]",
        // libraryExport: 'default'


        filename: production?'[name].min.js':'[name].js',
        libraryTarget: "umd"
    },
    resolve: {
        alias: {
            // 'hast-util-to-vdom': path.resolve(__dirname, 'src/lib/hast-util-to-vdom.common.js')
        }
    },
    module: {
    },
    // externals: {
    //     'lowlight': 'lowlight'
    //     // 'react': 'React',
    //     // 'vremark-plugin-katex': 'vremarkPluginKatex'
    // },
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
        },
        externals: {
            'lowlight': 'lowlight',
            'katex': 'katex'
        },
    }),

    merge(config, {
        entry:{
            'lowlight': path.resolve(__dirname, 'src/lib/lowlight.js')
        },
    }),



    /*
    merge(config, {
        entry:{
            'vremark-plugin-flowchart': './src/plugins/flowchart/index.js'
        },
        externals: {
            'flowchart.js': 'flowchart.js',
            'Raphael': 'Raphael',
            'raphael': 'Raphael'
        },
    }),
    merge(config, {
        entry:{
            'vremark-plugin-highlight': './src/plugins/highlight/index.js'
        },
        externals: {
            'highlight.js': 'highlight.js'
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
            'underscore': 'underscore'
        },
    }),
    merge(config, {
        entry:{
            'vremark-plugin-toc': './src/plugins/toc/index.js'
        },
        externals: {
        },
    })
    */
];

