const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const base = require('../config/webpack.config.base');

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
            const example = process.argv.slice(-1)[0];
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

