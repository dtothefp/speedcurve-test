export default {
  eslint: {
    basic: false,
    react: true,
    generate: false
  },
  webpack: {
    shouldRev: true,
    includePaths: [],
    expose: {
      'js-cookie': 'Cookie',
      'query-string': 'qs'
    },
    externals: [
      {
        name: {
          jquery: 'jQuery'
        },
        provide: {
          'global.jQuery': 'jquery',
          'window.jQuery': 'jquery',
          '$': 'jquery'
        }
      }
    ],
    hot: true
  }
};
