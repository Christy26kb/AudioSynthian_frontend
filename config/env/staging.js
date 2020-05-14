'use strict';

// eslint-disable-next-line no-unused-vars
const stagingConfig = {
  api_endpoint: 'https://jsonplaceholder.typicode.com',
  environment: 'staging'
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
    ...stagingConfig,
    logger: {
      level: 3 // LEVEL_ERROR
    }
  }
};
