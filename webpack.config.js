const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const toExclude = [
    /node_modules/
];

module.exports = (env, options = {}) => {
    const development = ((options.mode || 'development') === 'development');
    const publicPath = (env || {}).publicPath || 'http://localhost:8080/';

    return {
        context: __dirname,
        devtool: development ? "inline-sourcemap" : false,
        entry: "./app/index.js",
        output: {
            path: path.join(__dirname, 'dist/assets/'),
            filename: '[name].bundle.js',
            chunkFilename: '[name].js',
            publicPath: 'http://localhost:8080/assets/'
        },
        plugins: development ? [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'app/index.ejs',
                title: '[DEV] Morphroll [DEV]'
            }),
        ] : [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'app/index.ejs',
                title: '[DEV] Morphroll [DEV]'
            }),
            new CleanWebpackPlugin(['dist'])
        ],
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            }
        },
        resolve: {
            alias: {
                vue: 'vue/dist/vue.js'
            }
        },
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    use: "eslint-loader",
                    exclude: toExclude
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                            // the "scss" and "sass" values for the lang attribute to the right configs here.
                            // other preprocessors should work out of the box, no loader config like this necessary.
                            'scss': 'vue-style-loader!css-loader!sass-loader',
                            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                            js: 'babel-loader?presets[]=@babel/preset-env&plugins[]=syntax-dynamic-import'
                        }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        development ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: ['@babel/preset-env'],
                            plugins: ['syntax-dynamic-import']
                        }
                    },
                    exclude: toExclude
                },
                {
                    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.mp3$|\.m4v$|\.ogv$|\.webm$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/',
                            publicPath: publicPath + 'images/'
                        }
                    }
                },
                {
                    test: /\.woff$|\.eot$|\.ttf$|\.woff2$$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts/',
                            publicPath: publicPath + 'fonts/'
                        }
                    }
                }
            ]
        }
    }
};