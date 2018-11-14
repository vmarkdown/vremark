const path = require('path');
const production = (process.env.NODE_ENV === 'production');

module.exports = {
    mode: 'none',
    output: {
    },
    resolve: {
        alias: {
            'vremark-util': path.resolve(__dirname, '../src/lib/vremark-util/index.js'),
            'js-sequence-diagrams': path.resolve(__dirname, '../src/lib/js-sequence-diagrams/sequence-diagram.js'),
            'js-sequence-diagrams-css': path.resolve(__dirname, '../src/lib/js-sequence-diagrams/sequence-diagram.css'),

            'vremark-plugin-math': path.resolve(__dirname, '../src/plugins/vremark-plugin-math/', 'index.js'),
            'vremark-plugin-flowchart': path.resolve(__dirname, '../src/plugins/vremark-plugin-flowchart/', 'index.js'),
            'vremark-plugin-sequence': path.resolve(__dirname, '../src/plugins/vremark-plugin-sequence/', 'index.js'),
            'vremark-plugin-mermaid': path.resolve(__dirname, '../src/plugins/vremark-plugin-mermaid/', 'index.js'),
            'vremark-plugin-highlight': path.resolve(__dirname, '../src/plugins/vremark-plugin-highlight/', 'index.js'),
            // 'vremark-plugin-highlight': path.resolve(__dirname, '../src/plugins/vremark-plugin-prism/', 'index.js'),

            'vremark-plugin-g2': path.resolve(__dirname, '../src/plugins/vremark-plugin-g2/', 'index.js'),
            'vremark-plugin-chart': path.resolve(__dirname, '../src/plugins/vremark-plugin-chart/', 'index.js'),





            'unist-util-data': path.resolve(__dirname, '../node_modules/vremark-parse/packages/', 'unist-util-data', 'index.js'),
            'mdast-util-to-hast': path.resolve(__dirname, '../node_modules/vremark-parse/packages/', 'mdast-util-to-hast', 'index.js'),



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
                    options: { name: production?'[name].[contenthash].js':'[name].js' }
                    // options: { name: 'WorkerName.[hash].js' }
                }
            },
            {
                test: /\.md$/,
                use: 'text-loader'
            },

            // {
            //     test: /^(?!highlight)[\s\S]*\.css/,
            //     use: [
            //         "style-loader",
            //         "css-loader"
            //     ]
            // },
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
                        // name: '[path][name].[ext]',
                        // name: production?'fonts/[name].[hash].[ext]':'[path][name].[ext]',
                        name: 'fonts/[name].[hash].[ext]',
                        context: 'src'
                    }
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader:'file-loader',
                    options: {
                        name: production?'images/[name].[hash].[ext]':'[path][name].[ext]',
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

