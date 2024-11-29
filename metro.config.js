const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        /* resolver options */
       sourceExts: ['jsx','js', 'ts', 'tsx', 'json'] // add tsx if its not yet defined
      },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
