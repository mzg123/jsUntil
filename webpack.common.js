const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './js-anim-es6/js-anim-index.js',
    //print: './src/print.js'
  },
 // optimization: {
 //    runtimeChunk: {
 //        name: "manifest"
 //    },
 //    splitChunks: {
 //        cacheGroups: {
 //            commons: {
 //                test: /[\\/]node_modules[\\/]/,
 //                name: "vendor",
 //                chunks: "all"
 //            }
 //        }
 //    }
 // },
  plugins: [
    new CleanWebpackPlugin(['dist']),
   // new HtmlWebpackPlugin({
   //   title: 'Production'
   // }),
  ],
  output: {
    filename: 'jsanim.js',
    library: 'jsanim',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ],
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  'file-loader'
              ],
          },
          {
                test:/\.js$/, 
                exclude: /(node_modules)/,
                use:[{loader:"babel-loader"}]
          }
      ],
  },
};
