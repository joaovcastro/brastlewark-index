const HtmlWebPackPlugin = require('html-webpack-plugin');
let path = require('path');

const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    },
    {
      test: /\.(png|jpg|gif|mp4|mov)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    },
  ],
};

const client = {
  entry: {
    client: './src/client/index.js',
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/',
  },
  module: moduleObj,
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/client/index.html',
    }),
  ],
};

const server = {
  entry: {
    server: './src/server/index.js',
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: moduleObj,
};

module.exports = (_, arg) =>
  arg.mode === 'development' ? [client] : [client, server];
