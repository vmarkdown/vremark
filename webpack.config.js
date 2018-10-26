const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const production = (process.env.NODE_ENV === 'production');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require('assets-webpack-plugin');

const base = require('./config/webpack.config.base');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'vremark/',
        // filename: '[name].common.js',
        // filename: production?'[name].common.min.js':'[name].common.js',
        // libraryTarget: "umd",
        // libraryTarget: "commonjs2",

        library: "[name]",
        // libraryExport: 'default'
        // filename: production?'[name].min.js':'[name].js',
        // libraryTarget: "umd"

        filename: production?'[name].min.js':'[name].js',
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
    // merge(base, config, {
    //     entry:{
    //         vremark: path.resolve(__dirname, './src/index.js')
    //     },
    //     externals: {
    //     },
    //     plugins: [
    //
    //     ]
    // }),

    merge(base, config, {
        entry:{
            'vremark-parse': path.resolve(__dirname, './src/core/parse.js')
        }
    }),

    merge(base, config, {
        entry:{
            'vremark-render': path.resolve(__dirname, './src/core/render.js')
        }
    }),

    merge(base, config, {
        entry:{
            'vremark-plugin-math': 'vremark-plugin-math',
            'vremark-plugin-flowchart': 'vremark-plugin-flowchart',
            'vremark-plugin-sequence': 'vremark-plugin-sequence',
            'vremark-plugin-mermaid': 'vremark-plugin-mermaid',
            'vremark-plugin-highlight': 'vremark-plugin-highlight',
            'vremark-plugin-g2': 'vremark-plugin-g2',
            'vremark-plugin-chart': 'vremark-plugin-chart'
        },
        output: {
            filename: production?'[name].[hash].min.js':'[name].js',
            libraryTarget: "amd"
        },
        plugins: [
            new AssetsPlugin({
                filename: 'plugins.json',
                path: path.join(__dirname, 'dist'),
                prettyPrint: true,
                processOutput: function (assets) {
                    var plugins = {};
                    Object.keys(assets).forEach(function (asset) {
                        if(!asset || asset.startsWith('vendors') || asset.endsWith('-libs')) return;
                        var plugin = assets[asset];
                        if(plugin.js){
                            var map = plugin.js.replace('.js','');
                            plugins[asset] = map;
                        }
                    });
                    return JSON.stringify(plugins);
                }
            })
        ]
    }),

];

