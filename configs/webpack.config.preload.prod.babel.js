import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CheckNodeEnv from '../internals/scripts/CheckNodeEnv.js';
import baseConfig from './webpack.config.base';

const port = process.env.PORT || 1212;

if (process.env.NODE_ENV === 'production') {
  CheckNodeEnv('production');
}

export default merge(baseConfig, {
  devtool: 'inline-source-map',

  mode: 'production',

  target: 'electron-renderer',
  entry: path.join(__dirname, '..', 'app', 'preload.ts'),

  output: {
    path: path.join(__dirname, '..', 'app', 'dist'),
    filename: 'preload.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },
});
