const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(import.meta.dir);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
