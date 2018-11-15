const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const production = (process.env.NODE_ENV === 'production');

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

        filename: production?'[name].[contenthash].min.js':'[name].js',
        chunkFilename: production?'[name].[contenthash].min.js':'[name].js',
        // filename: production?'[name].min.js':'[name].js',
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader/useable" ,
                        options: {
                            // singleton: true,
                            // attrs: {}
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },


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
        new CleanWebpackPlugin(production?['dist']:[]),
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
            'vremark-worker': path.resolve(__dirname, './src/', 'vremark-worker.js')
        },
        output: {
            filename: production?'[name].min.js':'[name].js',
        }
    }),

    merge(base, config, {
        entry:{
            'vremark-parse': path.resolve(__dirname, './src/', 'vremark-parse.js')
        }
    }),

    merge(base, config, {
        entry:{
            'vremark-render': path.resolve(__dirname, './src/', 'vremark-render.js')
        },
        output: {
            filename: production?'[name].min.js':'[name].js',
        }
    }),

    // merge(base, config, {
    //     entry:{
    //         'vremark-plugin-manager': path.resolve(__dirname, './src/core/plugin-manager.js')
    //     }
    // }),

    // merge(base, config, {
    //     entry: {
    //
    //     },
    //     output: {
    //         filename: production?'[name].[hash].min.js':'[name].js',
    //         libraryTarget: "amd"
    //     }
    // }),














    merge(base, config, {
        entry: {

            'vremark-plugin-math-libs':         path.join(__dirname, './src/plugins/', 'vremark-plugin-math','/libs.js'),
            'vremark-plugin-flowchart-libs':    path.join(__dirname, './src/plugins/', 'vremark-plugin-flowchart','/libs.js'),
            'vremark-plugin-sequence-libs':     path.join(__dirname, './src/plugins/', 'vremark-plugin-sequence','/libs.js'),
            'vremark-plugin-mermaid-libs':      path.join(__dirname, './src/plugins/', 'vremark-plugin-mermaid','/libs.js'),
            'vremark-plugin-g2-libs':           path.join(__dirname, './src/plugins/', 'vremark-plugin-g2','/libs.js'),
            'vremark-plugin-chart-libs':        path.join(__dirname, './src/plugins/', 'vremark-plugin-chart','/libs.js'),
            'vremark-plugin-highlight-libs':    path.join(__dirname, './src/plugins/', 'vremark-plugin-highlight','/libs.js'),

            'vremark-plugin-math':      'vremark-plugin-math',
            'vremark-plugin-flowchart': 'vremark-plugin-flowchart',
            'vremark-plugin-sequence':  'vremark-plugin-sequence',
            'vremark-plugin-mermaid':   'vremark-plugin-mermaid',
            'vremark-plugin-g2':        'vremark-plugin-g2',
            'vremark-plugin-chart':     'vremark-plugin-chart',
            'vremark-plugin-highlight': 'vremark-plugin-highlight',
            'vremark-plugin-resume':    'vremark-plugin-resume',

        },
        output: {
            filename: production?'[name].[contenthash].min.js':'[name].js',
            libraryTarget: "amd",
            path: path.resolve(__dirname, 'dist/plugins'),
            publicPath: 'vremark/plugins/',
        },
        externals: {

            'vremark-plugin-math-libs':         'vremark-plugin-math-libs',
            'vremark-plugin-flowchart-libs':    'vremark-plugin-flowchart-libs',
            'vremark-plugin-sequence-libs':     'vremark-plugin-sequence-libs',
            'vremark-plugin-mermaid-libs':      'vremark-plugin-mermaid-libs',
            'vremark-plugin-g2-libs':           'vremark-plugin-g2-libs',
            'vremark-plugin-chart-libs':        'vremark-plugin-chart-libs',
            'vremark-plugin-highlight-libs':    'vremark-plugin-highlight-libs',

        },
        module: {
            rules: [

            ]
        },
        plugins: [
            new AssetsPlugin({
                filename: 'plugins.json',
                path: path.join(__dirname, 'dist'),
                prettyPrint: true,
                processOutput: function (assets) {
                    var plugins = {};
                    Object.keys(assets).forEach(function (asset) {
                        // if(!asset || asset.startsWith('vendors') || asset.endsWith('-libs')) return;
                        if(!asset) return;
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


    })





];

