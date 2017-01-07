const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const overrideProcessEnv = value => config => {
  config.resolve.modules = [path.join(__dirname, 'src')].concat(config.resolve.modules);
  config.resolve.plugins.push(new TsconfigPathsPlugin({ configFile: './tsconfig.json' }));
  return config;
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#6b8d04', //'#038fde',
      '@secondary-color': '#2fa449', //'#fa8c16',
      '@text-color': '#545454',
      '@heading-color': '#535353',
      '@nav-dark-bg': '#343d45', //'#003366',
      '@header-text-color': '#262626',
      '@layout-header-background': '#fefefe',
      '@layout-footer-background': '#fffffd',
      '@nav-dark-text-color': '#E0E0E0', //'#038fdd',
      '@hor-nav-text-color': '#fffffd',
      '@nav-header-selected-text-color': '#fdbe33',
      '@form-item-margin-bottom': '19px',
      '@border-radius-base': '2px',
      '@input-height-lg': '48px',
      '@input-height-sm': '24px',
      '@form-vertical-label-padding': '0 0 4px',
    },
  }),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version),
  })
);
