const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const base = require('../config/webpack.config.base');
const example = process.argv.slice(-1)[0];

const config = {
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        // libraryTarget: "umd",
        // library: "[name]",
        // libraryExport: 'default'
    },
    module: {
        rules: [


            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }

            // {
            //     test: /^(?!highlight.js\/styles)[a-zA-Z-_0-9\./]+\.css/,
            //     use: [
            //         "style-loader",
            //         "css-loader"
            //     ]
            // },
            // {
            //     test: /^(?!highlight)[\s\S]*\.css/,
            //     use: [
            //         // "style-loader",
            //         "css-loader"
            //     ]
            // }


            // {
            //     test: /\.css$/,
            //     use: [
            //         { loader: "style-loader" },
            //         { loader: "css-loader" },
            //     ],
            // },




        ]
    },
    externals: {
        'vue': 'Vue'
    },
    plugins: [],
    devServer: {
        // hotOnly: true,
        inline: false,
        hot: false,
        contentBase: path.join(__dirname, "www")
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // }
};



module.exports = [
    merge(base, config, {
        entry: (function () {
            const entry = {};
            console.log('example:', example);
            entry['example-'+example+'-main'] = path.resolve(__dirname, './'+example+'/index.js');
            return entry;
        })(),
        externals: {

        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'examples/'+example+'/index.html'
            })
        ],
        module: {
            rules: [
            ]
        }
    }),



    merge(base, config, {
        entry: {
            'vremark-plugin-math-libs':         path.join(__dirname, '../src/plugins/', 'vremark-plugin-math','/libs.js'),
            'vremark-plugin-flowchart-libs':    path.join(__dirname, '../src/plugins/', 'vremark-plugin-flowchart','/libs.js'),
            'vremark-plugin-sequence-libs':     path.join(__dirname, '../src/plugins/', 'vremark-plugin-sequence','/libs.js'),
            'vremark-plugin-mermaid-libs':      path.join(__dirname, '../src/plugins/', 'vremark-plugin-mermaid','/libs.js'),
            'vremark-plugin-g2-libs':           path.join(__dirname, '../src/plugins/', 'vremark-plugin-g2','/libs.js'),
            'vremark-plugin-chart-libs':        path.join(__dirname, '../src/plugins/', 'vremark-plugin-chart','/libs.js'),
            'vremark-plugin-highlight-libs':    path.join(__dirname, '../src/plugins/', 'vremark-plugin-highlight','/libs.js'),
        },
        output: {
            libraryTarget: "amd"
        }
    }),

    merge(base, config, {
        entry: {

            'vremark-plugin-math':      'vremark-plugin-math',
            'vremark-plugin-flowchart': 'vremark-plugin-flowchart',
            'vremark-plugin-sequence':  'vremark-plugin-sequence',
            'vremark-plugin-mermaid':   'vremark-plugin-mermaid',
            'vremark-plugin-g2':        'vremark-plugin-g2',
            'vremark-plugin-chart':     'vremark-plugin-chart',
            'vremark-plugin-highlight': 'vremark-plugin-highlight',

        },
        output: {
            libraryTarget: "amd"
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
                //     test: /\.less$/,
                //     use: [
                //         {
                //             loader: "style-loader/useable" //,  options: { attrs: { id: 'id' } }
                //         },
                //         {
                //             loader: "css-loader"
                //         }
                //     ]
                // }

                // {
                //     // test: /highlight[\s\S]*\.css$/,
                //     test: function(file){
                //         if(/highlight[\s\S]*\.css$/.test(file)){
                //             console.log('=====================');
                //             console.log(file);
                //             return true;
                //         }
                //         return false
                //     },
                //     use: [
                //         {
                //             loader: "style-loader/useable",
                //             // options: { attrs: { id: 'id' } }
                //         },
                //         {
                //             loader: "css-loader"
                //         }
                //     ]
                // }
            ]
        }
    })

];

