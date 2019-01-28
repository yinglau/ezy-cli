const path = require('path');

module.exports = (opts) => ({
  // see https://webpack.docschina.org/concepts/mode/ for the description
  mode: opts.mode,

  // webpack entry config
  entry: opts.entry,

  output: Object.assign(
    {
      path: path.resolve('build'),
      publicPath: '/',
    },
    opts.output
  ),
  module: {
    rules: opts.module.rules
  },
  plugins: opts.plugins.concat([

  ]),
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: opts.devtool || '',
  performance: opts.performance,
  target: 'web', // Make web variables accessible to webpack, e.g. window
});
