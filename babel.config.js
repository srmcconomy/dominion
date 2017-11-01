module.exports = {
  node: {
    presets: [
      ['env', {
        targets: { node: '8.7' },
      }],
      'react',
    ],
    plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread', 'wildcard'],
  },
  clientDev: {
    presets: [
      ['env', {
        targets: { chrome: '62' },
        modules: false,
      }],
      'react'
    ],
    plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread', 'wildcard'],
  },
  clientProd: {
    presets: [
      ['env', {
        targets: { browsers: '> 5%' },
        modules: false,
      }],
      'react',
      'minify',
    ],
    plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread', 'wildcard'],
  },
};
