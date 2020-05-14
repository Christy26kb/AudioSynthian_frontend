'use strict';

/* eslint-disable import/no-extraneous-dependencies */
const config = require('config');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  entry: [path.join(__dirname, './src/js/index.jsx')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
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
        test: /\.json?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json-loader'
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
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`
      },
      ENV: config.webpack,
      appConfig: JSON.stringify(config.clientConfig)
    })
  ]
}];
