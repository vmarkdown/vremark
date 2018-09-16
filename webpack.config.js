const path = require('path');
const merge = require('webpack-merge');

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
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    externals: {
    },
    plugins: [
    ]
};

module.exports = [
    // merge(config, {
    //     entry:{
    //         'vremark-plugin-vdom': './src/plugins/vdom/index.js'
    //     },
    //     output: {
    //         library: "vremarkPluginVdom"
    //     },
    // }),
    merge(config, {
        entry:{
            'vremark-plugin-katex': './src/plugins/katex/index.js'
        },
        output: {
            library: "vremarkPluginKatex"
        },
    }),
    merge(config, {
        entry:{
            vremark: './src/index.js'
        }
    }),
    merge(config, {
        entry:{
            main: './examples/main.js'
        },
        externals: {
            'vremark-plugin-katex': 'vremarkPluginKatex'
        }
    }),
    // merge({
    //     entry:{
    //         vmarkdown: './src/index.js'
    //     },
    //     externals: {
    //         vremark: 'vremark'
    //     }
    // }, config)
];

