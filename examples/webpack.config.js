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
            'rehype-vdom': path.resolve(__dirname, '../src/lib/rehype-vdom.common.js'),
            'hast-util-to-vdom': path.resolve(__dirname, '../src/lib/hast-util-to-vdom.common.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.md$/,
                use: 'text-loader'
            }
        ]
    },
    externals: {
        // 'flowchart.js': 'flowchart',
        // 'highlight.js': 'hljs',
        'lowlight': 'lowlight',
        'katex': 'katex',
        // 'mermaid': 'mermaid',
        // 'underscore': '_'
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

