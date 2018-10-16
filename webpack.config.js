const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const production = (process.env.NODE_ENV === 'production');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    // externals: {
    //     'lowlight': 'lowlight'
    //     // 'react': 'React',
    //     // 'vremark-plugin-katex': 'vremarkPluginKatex'
    // },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
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
            'flowchart.js': 'flowchart',
            'lowlight': 'lowlight',
            'katex': 'katex',
            'underscore': '_'
        },
        plugins: [

        ]
    }),
    merge(config, {
        entry:{
            'lowlight': path.resolve(__dirname, 'src/lib/lowlight.js')
        },
    })
];

