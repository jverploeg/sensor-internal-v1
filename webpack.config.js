// webpack is a static module bundler for modern JavaScript applications. 
//  When webpack processes your application, it internally builds a dependency graph which 
//  maps every module the project needs and generates one or more bundles.

// All packages, presets, and plugins need to be configured here

//IMPORTS
const path = require('path');

//PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    // output bundle won't be optimized for production, but suitable for development
    mode: 'development',
    // ENTRY POINT
    entry: path.resolve(__dirname, 'src', index.jsx),
    // PLUGINS
    plugins: [
        new CleanWebpackPlugin(), // clears dist folder after each build
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') } ),
        new MiniCssExtractPlugin({ filename: './src/styles/styles.css' }),
    ],

    // OUTPUT
    output: {
        //output of bundling will be in dist folder created upon build
        path: path.resolve(__dirname, 'src', 'dist'),
        // declare filename
        filename: 'bundle.js'
    },

    // DEV-TOOLS
    devtool : 'inline-source-map', // helps identify error locations


    module: {
    // configuration regarding modules
        rules: [
        // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
          // sass loader
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],    
    },


  // Resolve any file extension issues
  resolve: {
    extensions: ['.js', '.jsx'],
  },

//   performance: {
//     maxAssetSize: 200000, // int (in bytes),
//     maxEntrypointSize: 400000, // int (in bytes)
//     // assetFilter: function(assetFilename) {
//     //   // Function predicate that provides asset filenames
//     //   return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
//     // }
//   },
};