'use strict';

// eslint-disable-next-line no-unused-vars
const prodConfig = {
  api_endpoint: 'https://jsonplaceholder.typicode.com',
  environment: 'production'
};

module.exports = {
  webpack: {
    logDispatcher: false
  },
  uglify: {
    global: true,
    sourcemap: false,
    mangle: true,
    compress: true
  },
  clientConfig: {
    ...prodConfig,
    logger: {
      level: 3 // LEVEL_ERROR
    }
  }
};
