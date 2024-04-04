/*
  Конфиг алисов для импортов
*/
const path = require("path");

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@app/store": path.resolve(__dirname, "src/store/*"),
    "@app/hooks": path.resolve(__dirname, "src/hooks/*"),
    "@app/components": path.resolve(__dirname, "src/components/*"),
    "@app/pages": path.resolve(__dirname, "src/pages/*"),
  };

  return config;
};
