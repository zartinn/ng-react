// const path = require('path');
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');


/**
 * This webpack config will be merged with the one from node_modules/ng-react/builders/config/webpack.config.js
 * See commented lines below which are set by default from node_modules/ng-react/builders/config/webpack.config.js
 * Set manually one of these properties to overwrite the default values.
 */
module.exports = () => {
    // // Environment variables are set by builder
    // const basePath = process.env.projectRoot;
    // const mode = process.argv.find(arg => arg.includes('--mode'));
    // const isDev = !mode || mode.split('=')[1] === 'development';
    // process.env.NODE_ENV = isDev ? 'development' : 'production';

    // const sourceMapRule = isDev ? {
    //     test: /\.js$/,
    //     enforce: 'pre',
    //     use: ['source-map-loader'],
    // } : {}
    return {
        // devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
        // target: 'web', // necessary for Hot reloading to work right now with newest webpack: See: https://github.com/webpack/webpack-dev-server/issues/2758
        // entry: path.resolve(basePath, 'src/index'),
        // output: {
        //     path: path.join(process.cwd(), 'dist/demo'),
        //     filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
        //     chunkFilename: isDev ? '[name].chunk.js' : '[name].[contenthash:8].chunk.js',
        // },
        // resolve: {
        //     extensions: ['.ts', '.tsx', '.js'],
        //     alias: {
        //         "@assets": path.resolve(basePath, 'src/assets/')
        //     }
        // },

        // module: {
        //     rules: [
        //         {
        //             test: /\.(ts|js)x?$/,
        //             exclude: /node_modules/,
        //             use: {
        //                 loader: 'babel-loader'
        //             },
        //         },
        //         {
        //             test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //             use: [{
        //                 loader: 'file-loader',
        //                 options: {
        //                     name: isDev ? '[name].[ext]' : '[name].[contenthash:8].[ext]',
        //                     outputPath: 'assets/'
        //                 }
        //             }]
        //         },
        //         {
        //             test: /\.s?css$/,
        //             use: [
        //                 MiniCssExtractPlugin.loader,
        //                 'css-loader',
        //                 'sass-loader'
        //             ]
        //         },
        //         sourceMapRule
        //     ]
        // },
        // plugins: [
        //     new webpack.HotModuleReplacementPlugin(),
        //     new HtmlWebpackPlugin({
        //         template: path.resolve(basePath, 'src/index.html'),
        //         favicon: path.resolve(basePath, 'src/assets/favicon.ico')
        //     }),
        //     new CleanWebpackPlugin(),
        //     new MiniCssExtractPlugin({ chunkFilename: isDev ? '[name].css' : '[name].[contenthash:8].css' })
        // ]
    };
}