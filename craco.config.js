// craco.config.js
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve.fallback = {
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert/'),
        buffer: require.resolve('buffer/'),
        // Add other fallbacks if needed
      };

      config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer']
        })
      ];

      return config;
    }
  }
};
