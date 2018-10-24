const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const production = (process.env.NODE_ENV === 'production');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require('./config/webpack.config.base');

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
        // libraryTarget: "umd"
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         "css-loader"
            //     ]
            // },
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'sass-loader',
            //     ]
            // }
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
    merge(base, config, {
        entry:{
            vremark: path.resolve(__dirname, './src/index.js')
        },
        externals: {
        },
        plugins: [

        ]
    }),

    merge(base, config, {
        entry:{
            'vremark-chart': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-chart/component/vremark-chart.js'),
            'vremark-flowchart': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-flowchart/component/vremark-flowchart.js'),
            'vremark-g2': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-g2/component/vremark-g2.js'),
            'vremark-highlight': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-highlight/component/vremark-highlight.js'),
            'vremark-math': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-math/component/vremark-math.js'),
            'vremark-mermaid': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-mermaid/component/vremark-mermaid.js'),
            'vremark-sequence': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-sequence/component/vremark-sequence.js'),


        },
        output: {
            libraryTarget: "commonjs2"
        }
    }),

];

