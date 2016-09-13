export default {
  assemble: {
    data: {
      userName: process.cwd().split('/')[2]
    }
  },
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
  },
  cb(config) {
    const {environment} = config;
    const {branch, asset_path: assetPath} = environment;

    if (branch) {
      Object.assign(environment, {
        asset_path: assetPath.replace(branch + '/', '')
      });
    }

    return config;
  }
};
