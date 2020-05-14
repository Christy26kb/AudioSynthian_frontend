'use strict';

/* eslint-disable import/no-extraneous-dependencies */
const config = require('config');
const webpack = require('webpack');
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  entry: [
    './src/js/index.jsx',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server'
  ],
  output: {
    path: `${path.resolve(__dirname)}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.js?$/,
        include: /(src[\/\\]js)/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        include: /(src[\/\\]js)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'raw-loader']
      },
      {
        test: /\.scss?$/,
        loaders: ['style-loader', 'raw-loader', 'sass-loader', 'import-glob']
      },
      {
        test: /\.(png|ico|gif)?$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    disableHostCheck: true,
    https: true,
    host: '0.0.0.0',
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      { from: './assets', to: './assets' }
    ]),
    new webpack.IgnorePlugin(/^(buffertools)$/),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(config.webpack),
      appConfig: JSON.stringify(config.clientConfig)
    }),
    new Visualizer({ filename: '../reports/bundle-statistics.html' }),
    new webpack.LoaderOptionsPlugin({ debug: process.env === 'production' }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map'
};
