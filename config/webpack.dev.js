const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getLocalIdent = require('../src/utils/getLocalIdent');
const mode = 'development';




module.exports = merge (common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3042,
        historyApiFallback: true,
        overlay: true,
        open: true,
        stats: 'errors-only'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                oneOf: [
                    {
                        test: [/\.module\.css$/],
                        use: [
                            {
                                loader: 'style-loader',
                                options: {
                                    injectType:
                                        mode === 'development'
                                            ? 'styleTag'
                                            : 'singletonStyleTag'
                                }
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: {
                                        getLocalIdent,
                                        localIdentName: `[name]-[local]-[hash:base64:3]`
                                    },
                                    sourceMap: mode === 'development'
                                }
                            },

                        ]
                    },
                    {
                        use: [
                            {
                                loader: 'style-loader',
                                options: {
                                    injectType:
                                        mode === 'development'
                                            ? 'styleTag'
                                            : 'singletonStyleTag'
                                }
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: false,
                                    sourceMap: mode === 'development'
                                }
                            },

                        ]
                    }
                ]
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),

    ],
});
