const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Critters = require('critters-webpack-plugin');
const getLocalIdent = require('../src/utils/getLocalIdent');
const enableBundleAnalyzer = process.env.ENABLE_ANALYZER === 'true';

const genRegexAllowedClasses = () => {
    const classes = ['.header',]; // must be extend all css classes from mobile what exits in more then 2 pages
    // this is regex means .headerNav and such classes get match aswell
    return [new RegExp(classes.join('|').replace(/\./g, '\\.'))];

};

const config = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                oneOf: [
                    {
                        test: [/\.module\.css$/],
                        use: [
                            {
                                loader : MiniCssExtractPlugin.loader,
                                options : {}
                               },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: {
                                        getLocalIdent,
                                        localIdentName: `[name]-[local]-[hash:base64:3]`
                                    },
                                    sourceMap:false
                                }
                            }
                        ]
                    },
                    {
                        use: [
                            {
                                loader : MiniCssExtractPlugin.loader,
                                options : {}
                               },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: false,
                                    sourceMap: false
                                }
                            },

                        ]
                    }
                ]
            }
        ]
    },

    plugins: [

        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
            root: process.cwd(),
            verbose: true,
            dry: false
        }),
        new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
            chunkFilename: "[id].[hash:8].css"
        }),
        new ManifestPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: enableBundleAnalyzer === true ? 'static' : 'disabled',
            openAnalyzer: true,
        }),


        new Critters({
                    allowRules: genRegexAllowedClasses(),
                    pruneSource: true,
                    reduceInlineStyles: false,
                    noscriptFallback: false,

                    logLevel: 'debug'
                })

    ],
});






module.exports = config;
