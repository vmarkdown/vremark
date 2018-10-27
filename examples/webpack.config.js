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
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader"
                    ]
                }
            ]
        }
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
                            loader: "style-loader/useable" //,  options: { attrs: { id: 'id' } }
                        },
                        {
                            loader: "css-loader"
                        }
                    ]
                }

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

