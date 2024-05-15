const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


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

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Todo-App',
        template: './src/template.html', 
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

    },

  };