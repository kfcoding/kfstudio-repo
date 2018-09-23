const { injectBabelPlugin } = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');


module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = rewireMobX(config, env);

  // config.externals = {
  //   antd: 'antd'
  // };

  // see https://github.com/styled-components/styled-components/issues/1076#issuecomment-390837273
  config.resolve = Object.assign({}, config.resolve, {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules', 'src'],
  });


  return config;
};