const { override, fixBabelImports, addLessLoader } = require('customize-cra');
// const { getThemeVariables } = require('antd/dist/theme');

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: { '@primary-color': '#1DA57A', '@font-size-base': '12px' },
      // modifyVars: getThemeVariables({
      // 	dark: true,
      // 	compact: true,
      // }),
    },
    // sourceMap: true,
  }),
);
