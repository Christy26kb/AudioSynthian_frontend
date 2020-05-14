'use strict';

// eslint-disable-next-line no-unused-vars
const developConfig = {
  api_endpoint: 'http://localhost:3000',
  environment: 'development'
};

module.exports = {
  clientConfig: {
    ...developConfig
  }
};
