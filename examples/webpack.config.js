const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const example = process.argv.slice(-1)[0];

console.log('example:', example);

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        // libraryTarget: "umd",
        // library: "[name]",
        // libraryExport: 'default'
    },
    resolve: {
        alias: {
            'vremark-util': path.resolve(__dirname, '../src/lib/vremark-util/index.js'),
            'js-sequence-diagrams': path.resolve(__dirname, '../src/lib/js-sequence-diagrams/sequence-diagram.js'),
            'js-sequence-diagrams-css': path.resolve(__dirname, '../src/lib/js-sequence-diagrams/sequence-diagram.css'),

            'vremark-component-math': path.resolve(__dirname, '../src/plugins/vremark-plugin-math/component/vremark-math.js'),
            'vremark-component-flowchart': path.resolve(__dirname, '../src/plugins/vremark-plugin-flowchart/component/vremark-flowchart.js'),
            'vremark-component-sequence': path.resolve(__dirname, '../src/plugins/vremark-plugin-sequence/component/vremark-sequence.js'),
            'vremark-component-mermaid': path.resolve(__dirname, '../src/plugins/vremark-plugin-mermaid/component/vremark-mermaid.js'),

            'vremark-component-highlight': path.resolve(__dirname, '../src/plugins/vremark-plugin-highlight/component/vremark-highlight.js'),

            'vremark-component-g2': path.resolve(__dirname, '../src/plugins/vremark-plugin-g2/component/vremark-g2.js'),
            'vremark-component-chart': path.resolve(__dirname, '../src/plugins/vremark-plugin-chart/component/vremark-chart.js'),


            // 'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.js'),
            // 'hast-util-raw': path.resolve(__dirname, '../src/lib/hast-util-raw/index.js'),
            // 'rehype-vdom': path.resolve(__dirname, '../src/lib/rehype-vdom.common.js'),
            // 'hast-util-to-vdom': path.resolve(__dirname, '../src/lib/hast-util-to-vdom.common.js')
        }
    },
    module: {
        rules: [
            {
                test: require.resolve('snapsvg'),
                loader: 'imports-loader?this=>window,fix=>module.exports=0'
            },
            {
                test: require.resolve(path.resolve(__dirname, '../src/lib/js-sequence-diagrams/sequence-diagram.js')),
                loader: 'imports-loader?_=underscore,Raphael=raphael'
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: { name: '[name].js' }
                    // options: { name: 'WorkerName.[hash].js' }
                }
            },
            {
                test: /\.md$/,
                use: 'text-loader'
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader:'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context:'src'
                    }
                }
            }
        ]
    },
    externals: {
        // 'vue': 'Vue',
        // 'flowchart.js': 'flowchart',
        // 'highlight.js': 'hljs',
        // 'lowlight': 'lowlight',
        // 'katex': 'katex',
        // 'underscore': '_',
        // 'mermaid': 'mermaid',
        // '@antv/g2': 'G2'
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor",
        //     minChunks: Infinity
        // }),
    ],
    devServer: {
        // hotOnly: true,
        inline: false,
        hot: false,
        contentBase: path.join(__dirname, "www")
    },
    node: {
        fs: 'empty'
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

const entry = {
    // vendor: ["vue"],
};
entry['example-'+example+'-main'] = path.resolve(__dirname, './'+example+'/index.js');

module.exports = [
    merge(config, {
        entry: entry,
        externals: {

        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'examples/'+example+'/index.html'
            })
        ],
    }),

    /*
    merge(config, {
        entry: {
            'vremark-chart.plugin': path.resolve(__dirname, '../src/plugins/vremark-chart/component/vremark-chart.js')
        },
        output: {
            libraryTarget: "amd",
        },
        externals: {

        }
    }),

    merge(config, {
        entry: {
            'vremark-flowchart.plugin': path.resolve(__dirname, '../src/plugins/vremark-flowchart/component/vremark-flowchart.js')
        },
        output: {
            libraryTarget: "amd",
        },
        externals: {

        }
    }),

    merge(config, {
        entry: {
            'vremark-g2.plugin': path.resolve(__dirname, '../src/plugins/vremark-g2/component/vremark-g2.js')
        },
        output: {
            libraryTarget: "amd",
        },
        externals: {

        }
    }),

    merge(config, {
        entry: {
            'vremark-highlight.plugin': path.resolve(__dirname, '../src/plugins/vremark-highlight/component/vremark-highlight.js')
        },
        output: {
            libraryTarget: "amd",
        },
        externals: {

        }
    }),

    merge(config, {
        entry: {
            'vremark-math.plugin': path.resolve(__dirname, '../src/plugins/vremark-math/component/vremark-math.js')
        },
        output: {
            libraryTarget: "amd",
        },
        externals: {

        }
    }),


    merge(config, {
        entry: {
            'vremark-mermaid.plugin': path.resolve(__dirname, '../src/plugins/vremark-mermaid/component/vremark-mermaid.js')
        },
        output: {
            libraryTarget: "amd",
        },
        externals: {

        }
    }),


    merge(config, {
        entry: {
            'vremark-sequence.plugin': path.resolve(__dirname, '../src/plugins/vremark-sequence/component/vremark-sequence.js')
        },
        output: {
            libraryTarget: "amd",
        },
        externals: {

        }
    }),

*/



];

