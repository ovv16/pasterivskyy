const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    contacts: './src/assets/scripts/contacts.js',
    about: './src/assets/scripts/about.js',
    home: './src/assets/scripts/home.js',
    index: './src/assets/scripts/index-app.js',
    gallery: './src/assets/scripts/gallery.js',
    developer: './src/assets/scripts/developer.js',
    progress: './src/assets/scripts/progress.js',
    progressSingle: './src/assets/scripts/progress-single.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'immediate-loading';
          },
        },
      },
    },
  },
  plugins: [

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: process.argv.includes('--production')
        }
      }
    }),
  ],
};

module.exports = config;
