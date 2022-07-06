const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

const { isLocal } = slsw.lib.webpack;

module.exports = {
  stats: 'normal',
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'inline-cheap-module-source-map',
  externals: [nodeExternals()],
  mode: isLocal ? 'development' : 'production',
  // node: false,
  resolve: { extensions: ['.ts', '.mjs', '.js'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack'),
  },
};
