import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: "./src/ImagePreview.jsx",
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'image-preview.js',
    libraryTarget: 'umd',
    library: 'ImagePreview'
  },
  module: {
    loaders: [
      {
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  },
  externals: {
    react: 'react'
  },
}
