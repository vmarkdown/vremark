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
        libraryTarget: "umd"
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
            'vremark-component-chart': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-chart/component/vremark-chart.js'),
            'vremark-component-flowchart': path.resolve(__dirname, './src/plugins' ,'vremark-plugin-flowchart/component/vremark-flowchart.js')

        },
        output: {
            libraryTarget: "commonjs2"
        }
    }),

];

