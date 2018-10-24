const path = require('path');

module.exports = {
    mode: 'none',
    output: {
    },
    resolve: {
        alias: {
            'vremark-util': path.resolve(__dirname, '../src/lib/vremark-util/index.js'),
            'js-sequence-diagrams': path.resolve(__dirname, '../src/lib/js-sequence-diagrams/sequence-diagram.js'),
            'js-sequence-diagrams-css': path.resolve(__dirname, '../src/lib/js-sequence-diagrams/sequence-diagram.css'),

            'vremark-math': path.resolve(__dirname, '../src/plugins/vremark-plugin-math/component/vremark-math.js'),
            'vremark-flowchart': path.resolve(__dirname, '../src/plugins/vremark-plugin-flowchart/component/vremark-flowchart.js'),
            'vremark-sequence': path.resolve(__dirname, '../src/plugins/vremark-plugin-sequence/component/vremark-sequence.js'),
            'vremark-mermaid': path.resolve(__dirname, '../src/plugins/vremark-plugin-mermaid/component/vremark-mermaid.js'),

            'vremark-highlight': path.resolve(__dirname, '../src/plugins/vremark-plugin-highlight/component/vremark-highlight.js'),

            'vremark-g2': path.resolve(__dirname, '../src/plugins/vremark-plugin-g2/component/vremark-g2.js'),
            'vremark-chart': path.resolve(__dirname, '../src/plugins/vremark-plugin-chart/component/vremark-chart.js'),


            'vremark-plugin-math': path.resolve(__dirname, '../src/plugins/vremark-plugin-math/', 'index.js'),



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
    },
    plugins: [
    ],
    node: {
        fs: 'empty'
    }
};

