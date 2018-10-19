const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const example = process.argv.slice(-1)[0];

console.log('example:', example);

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js',
        // libraryTarget: "umd",
        // library: "[name]",
        // libraryExport: 'default'
    },
    resolve: {
        alias: {
            // 'hast-util-raw': path.resolve(__dirname, '../src/lib/hast-util-raw/index.js'),
            // 'rehype-vdom': path.resolve(__dirname, '../src/lib/rehype-vdom.common.js'),
            // 'hast-util-to-vdom': path.resolve(__dirname, '../src/lib/hast-util-to-vdom.common.js')
        }
    },
    module: {
        rules: [
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
            }
        ]
    },
    externals: {
        'vue': 'Vue',

        'flowchart.js': 'flowchart',
        // 'highlight.js': 'hljs',
        'lowlight': 'lowlight',
        'katex': 'katex',
        'underscore': '_',
        'mermaid': 'mermaid',
        '@antv/g2': 'G2'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'examples/'+example+'/index.html'
        })
    ],
    devServer: {
        // hotOnly: true,
        inline: false,
        hot: false,
        contentBase: path.join(__dirname, "www")
    }
};

const entry = {};
entry['example-'+example+'-main'] = path.resolve(__dirname, './'+example+'/index.js');

module.exports = [
    merge(config, {
        entry: entry,
        externals: {

        }
    })
];

