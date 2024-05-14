const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


  module.exports = {
    mode: 'development',
    entry: {
       app: './src/index.js',
    },

    devtool: 'inline-source-map',
    target: 'web', // default value is 'web
    devServer: {
      static: './dist',
      hot: false,
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Todo-App',
        template: './src/template.html', // Path to your HTML template file
        filename: 'index.html',
      }),
    ],
    
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

  };