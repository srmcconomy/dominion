const path = require('path');

module.exports = {
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src/client'), path.resolve(__dirname, 'src/shared'), 'node_modules'],
    alias: {
      assets: path.resolve(__dirname, 'assets'),
    }
  },
};
