const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


  module.exports = {
    mode: 'production',
    entry: {
       app: './src/index.js',
    },

    devtool: 'source-map',
    target: 'web',
    devServer: {
      static: './dist',
      hot: false,
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
      clean: true,
    },

  };