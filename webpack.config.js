const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { clean } = require('gh-pages');


  module.exports = {
    mode: 'production',
    entry: {
       app: './src/index.js',
    },

    devtool: 'source-map',
    devServer: {
      static: './dist',
      hot: true,
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Todo-App',
        template: './src/template.html', 
      }),
    ],
    
    
    output: {
      filename: 'app.bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,

    },

  };