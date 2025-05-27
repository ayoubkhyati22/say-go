const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add SVG transformer configuration
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Add support for SVG files
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// Add path aliases resolution
config.resolver.alias = {
  '@': path.resolve(__dirname, './'),
  '@/components': path.resolve(__dirname, './components'),
  '@/context': path.resolve(__dirname, './context'),
  '@/hooks': path.resolve(__dirname, './hooks'),
  '@/services': path.resolve(__dirname, './services'),
  '@/types': path.resolve(__dirname, './types'),
  '@/styles': path.resolve(__dirname, './styles'),
  '@/data': path.resolve(__dirname, './data'),
  '@/utils': path.resolve(__dirname, './utils'),
};

module.exports = config;