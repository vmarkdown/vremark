const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const base = require('../config/webpack.config.base');

const example = process.argv.slice(-1)[0];

console.log('example:', example);

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
            /*
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
            */
        ]
    },
    externals: {
        'vue': 'Vue',
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
    merge(base, config, {
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

    merge(base, config, {
        entry: {
            'vremark-plugin-math': 'vremark-plugin-math',
            'vremark-plugin-flowchart': 'vremark-plugin-flowchart',
            'vremark-plugin-sequence': 'vremark-plugin-sequence',
            'vremark-plugin-mermaid': 'vremark-plugin-mermaid',
            'vremark-plugin-highlight': 'vremark-plugin-highlight',
            'vremark-plugin-g2': 'vremark-plugin-g2',
            'vremark-plugin-chart': 'vremark-plugin-chart'
        },
        output: {
            libraryTarget: "amd"
        }
    })

];

