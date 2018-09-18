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
        'react': 'React',
        'vremark-plugin-katex': 'vremarkPluginKatex'
    },
    plugins: [
    ]
};

module.exports = [
    merge(config, {
        entry:{
            vremark: './src/index.js'
        }
    }),

    // merge(config, {
    //     entry:{
    //         'example-react-main': './examples/react/index.js'
    //     }
    // }),

    // merge(config, {
    //     entry:{
    //         'vremark-plugin-vdom': './src/plugins/vdom/index.js'
    //     },
    //     output: {
    //         library: "vremarkPluginVdom"
    //     },
    // }),
    // merge(config, {
    //     entry:{
    //         'vremark-plugin-katex': './src/plugins/katex/index.js'
    //     },
    //     output: {
    //         library: "vremarkPluginKatex"
    //     },
    // }),


    merge(config, {
        entry:{
            'example-vue-main': './examples/vue/main.js'
        },
        externals: {

        }
    }),
    // merge(config, {
    //     entry:{
    //         'example-virtual-dom-main': './examples/virtual-dom/index.js'
    //     },
    //     externals: {
    //
    //     }
    // }),
    // merge({
    //     entry:{
    //         vmarkdown: './src/index.js'
    //     },
    //     externals: {
    //         vremark: 'vremark'
    //     }
    // }, config)
];

